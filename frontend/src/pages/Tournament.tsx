import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { request } from '@/services/api'
import { Tournament, TournamentMatch } from '@/types'
import { useUserPlayers } from '@/hooks/useUserPlayers'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui'
import { patterns } from '@/assets/design-system'
import { cn } from '@/utils/cn'

export const TournamentPage: React.FC = () => {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [check, setCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { userPlayers, loading: playersLoading } = useUserPlayers()
  const hasUpdated = useRef(false)

  const getPlayerName = (id: number): string => {
    const player = userPlayers.find(p => p.id === id)
    if (!player) {
      return `⚠️ Missing Player ${id}`
    }
    return player.display_name
  }

  // Generate tournament bracket structure
  const generateBracket = (matches: TournamentMatch[]) => {
    // Safety check for undefined/null matches
    if (!matches || !Array.isArray(matches)) {
      console.warn('generateBracket called with invalid matches:', matches)
      return []
    }

    const matchesByRound = matches.reduce((acc, match) => {
      if (!acc[match.round]) acc[match.round] = []
      acc[match.round].push(match)
      return acc
    }, {} as Record<number, TournamentMatch[]>)

    const sortedRounds = Object.keys(matchesByRound)
      .map(Number)
      .sort((a, b) => a - b)

    return sortedRounds.map(round => ({
      round,
      matches: matchesByRound[round].sort((a, b) => a.match_id - b.match_id)
    }))
  }

  // Component for individual player in bracket
  const BracketPlayer: React.FC<{
    playerId: number
    score: number
    isWinner: boolean
  }> = ({ playerId, score, isWinner }) => {
    const getPlayerStyles = () => {
      if (isWinner) return patterns.tournament.player.winner
      if (score > 0) return patterns.tournament.player.loser
      return patterns.tournament.player.pending
    }

    const getNameStyles = () => {
      return isWinner 
        ? patterns.tournament.player.name.winner 
        : patterns.tournament.player.name.default
    }

    const getScoreStyles = () => {
      if (isWinner) return patterns.tournament.player.score.winner
      if (score > 0) return patterns.tournament.player.score.loser
      return patterns.tournament.player.score.pending
    }

    return (
      <div className={cn(patterns.tournament.player.base, getPlayerStyles())}>
        <span className={cn(patterns.tournament.player.name.base, getNameStyles())}>
          {getPlayerName(playerId)}
        </span>
        <span className={cn(patterns.tournament.player.score.base, getScoreStyles())}>
          {score}
        </span>
      </div>
    )
  }

  // Component for bracket match
  const BracketMatch: React.FC<{
    match: TournamentMatch
    roundIndex: number
    totalRounds: number
  }> = ({ match, roundIndex, totalRounds }) => {
    const player1Info = match.players[0]
    const player2Info = match.players[1]
    const player1 = userPlayers.find(p => p.id === player1Info?.player_id)
    const player2 = userPlayers.find(p => p.id === player2Info?.player_id)
    const isMatchUnplayed = player1Info?.score === 0 && player2Info?.score === 0
    const player1Wins = player1Info?.score > (player2Info?.score || 0)
    const player2Wins = (player2Info?.score || 0) > player1Info?.score

    if (!player1Info) return null

    return (
      <div className={patterns.tournament.match.container}>
        <div className={patterns.tournament.match.players}>
          <BracketPlayer
            playerId={player1Info.player_id}
            score={player1Info.score}
            isWinner={player1Wins}
          />
          {player2Info && (
            <BracketPlayer
              playerId={player2Info.player_id}
              score={player2Info.score}
              isWinner={player2Wins}
            />
          )}
          
          {isMatchUnplayed && (
            <div className={patterns.tournament.match.vsIndicator.container}>
              <div className={patterns.tournament.match.vsIndicator.badge}>
                VS
              </div>
            </div>
          )}
        </div>

        {isMatchUnplayed && player1 && player2 && (
          <Button 
            onClick={() => handleStartMatch(match, player1, player2)}
            className={patterns.tournament.match.button}
          >
            🏓 Start Match
          </Button>
        )}

        {roundIndex < totalRounds - 1 && (
          <div className={patterns.tournament.match.connector.container}>
            <div className={patterns.tournament.match.connector.line}></div>
            <div className={patterns.tournament.match.connector.dot}></div>
          </div>
        )}
      </div>
    )
  }

  // Round badge component
  const RoundBadge: React.FC<{ round: number, totalRounds: number }> = ({ round, totalRounds }) => {
    const getBadgeStyle = () => {
      if (round === totalRounds - 1) return patterns.tournament.round.badge.final
      if (round === totalRounds - 2) return patterns.tournament.round.badge.semifinal
      return patterns.tournament.round.badge.regular
    }

    const getRoundText = () => {
      if (round === totalRounds - 1) return '🏆 FINAL'
      if (round === totalRounds - 2) return '⚔️ SEMIFINAL'
      return `🥊 ROUND ${round + 1}`
    }

    return (
      <div className={patterns.tournament.round.header}>
        <div className={cn(patterns.tournament.round.badge.base, getBadgeStyle())}>
          {getRoundText()}
        </div>
      </div>
    )
  }

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setIsLoading(true)
        console.log('Fetching tournaments...')
        const res = await request<Tournament[] | { items: Tournament[] }>('/tournaments')
        const tournaments: Tournament[] = 'items' in res ? res.items : res

        if (tournaments.length === 0) {
          alert('No tournaments have been played yet')
          navigate('/dashboard')
          return
        }
        const latestTournament = tournaments.sort((a, b) => b.id - a.id)[0]
        setTournament(latestTournament)
      } catch (err) {
        console.error('Failed to fetch tournaments:', err)
        alert('Something went wrong loading the tournament.')
        navigate('/dashboard')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTournaments()
  }, [check, navigate])

  useEffect(() => {
    const updateTournamentIfComplete = async () => {
      if (!tournament || tournament.status !== 'pending') return
      if (hasUpdated.current) return
      setCheck(false)

      if (!tournament.matches || tournament.matches.length === 1) {
        console.log('reached final!')
        return
      }
      const allPlayed = tournament.matches.every(
        (match: TournamentMatch) => match.players.length === 1 || match.players[0].score !== 0 || match.players[1].score !== 0
      )
      if (allPlayed) {
        try {
          console.log('sending tournament put request!')
          hasUpdated.current = true
          const updated = await request<Tournament>(`/tournaments/${tournament.id}`, {
            method: 'PUT',
            body: JSON.stringify({})
          })
          setTournament(updated)
          setCheck(true)
          console.log('updated tournament: ', updated)
          console.log('Tournament advanced to next round.')
          navigate('/tournament')
        } catch (err) {
          console.error('Failed to advance tournament:', err)
          navigate('/tournament')
        }
      }
    }
    updateTournamentIfComplete()
  }, [tournament, navigate])

  const handleReset = async () => {
    if (!tournament) return

    const confirmReset = window.confirm(
      `Are you sure you want to delete the tournament "${tournament.name}"?`
    )
    if (!confirmReset) return

    try {
      await request(`/tournaments/${tournament.id}`, {
        method: 'DELETE'
      })
      alert('Tournament deleted successfully.')
      navigate('/dashboard')
    } catch (error) {
      console.error('Failed to delete tournament:', error)
      alert('Failed to reset tournament. Please try again.')
    }
  }

  const handleStartMatch = (
    match: TournamentMatch,
    player1: { id: number; display_name: string; avatar: string },
    player2: { id: number; display_name: string; avatar: string }
  ) => {
    if (!player1 || !player2) {
      alert('Player information is missing.')
      return
    }

    const currentMatches = tournament!.matches?.filter(
        (m: TournamentMatch) => m.round === tournament!.current_round
    ) || []

    const matchType = currentMatches.length > 1 ? 'semifinal' : 'final'

    navigate('/game', {
      state: {
        matchId: match.match_id,
        matchType,
        player1: {
          name: player1.display_name,
          avatar: player1.avatar,
          id: player1.id,
        },
        player2: {
          name: player2.display_name,
          avatar: player2.avatar,
          id: player2.id,
        },
        returnTo: '/tournament',
      },
    })
  }

  if (isLoading || playersLoading) {
    return (
      <PageLayout showSidebar isLoading>
        <div>Loading tournament...</div>
      </PageLayout>
    )
  }

  if (!tournament) {
    return (
      <PageLayout showSidebar>
        <div>
          <h1>No Tournament Found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout showSidebar showHeader showFooter background="primary">
      {tournament.status === 'finished' && tournament.winner_id ? (
        <div className={patterns.tournament.winner.container}>
          <div className={patterns.tournament.winner.content}>
            <div className={patterns.tournament.winner.trophy}>🏆</div>
            <h1 className={patterns.tournament.winner.title}>
              {tournament.name}
            </h1>
            <h2 className={patterns.tournament.winner.subtitle}>
              Champion
            </h2>
            <p className={patterns.tournament.winner.champion}>
              {userPlayers.find((u) => u.id === tournament.winner_id)?.display_name || `Player ${tournament.winner_id}`}
            </p>
            <Button 
              onClick={() => navigate('/dashboard')} 
              className={patterns.tournament.winner.button}
            >
              New Tournament
            </Button>
          </div>
        </div>
      ) : (
        <div className={patterns.tournament.page.container}>
          <div className={patterns.tournament.page.wrapper}>
            <div className={patterns.tournament.page.header.container}>
              <div className={patterns.tournament.page.header.info}>
                <h1 className={patterns.tournament.page.header.title}>
                  {tournament.name}
                </h1>
                <p className={patterns.tournament.page.header.round}>
                  Round {tournament.current_round + 1}
                </p>
              </div>
              <Button 
                variant="ghost" 
                onClick={handleReset} 
                className={patterns.tournament.page.header.reset}
              >
                Reset Tournament
              </Button>
            </div>

            <div className={patterns.tournament.bracket.container}>
              <div className="overflow-x-auto">
                <div className="min-w-fit">
                  <div className={patterns.tournament.bracket.title.container}>
                    <h2 className={patterns.tournament.bracket.title.text}>
                      Tournament Bracket
                    </h2>
                    <div className={patterns.tournament.bracket.title.divider}></div>
                  </div>
                  
                  <div className={patterns.tournament.bracket.rounds.container}>
                    {generateBracket(tournament.matches || []).length > 0 ? (
                      generateBracket(tournament.matches || []).map(({ round, matches }, roundIndex, rounds) => (
                        <div key={round} className={patterns.tournament.bracket.rounds.round}>
                          <RoundBadge round={round} totalRounds={rounds.length} />
                          <div className={patterns.tournament.bracket.rounds.matches}>
                            {matches.map(match => (
                              <BracketMatch
                                key={match.match_id}
                                match={match}
                                roundIndex={roundIndex}
                                totalRounds={rounds.length}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">Tournament bracket is being updated...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={patterns.tournament.page.progress.container}>
              <p className={patterns.tournament.page.progress.text}>
                {tournament.matches?.filter(m => m.players.some(p => p.score > 0)).length || 0} of {tournament.matches?.length || 0} matches completed
              </p>
              {tournament.matches?.some(match => 
                match.players.some(player => !userPlayers.find(p => p.id === player.player_id))
              ) && (
                <p className="text-yellow-400 text-sm mt-2">
                  ⚠️ Some players in this tournament no longer exist. Consider resetting the tournament.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
