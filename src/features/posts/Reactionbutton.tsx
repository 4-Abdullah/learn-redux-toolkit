import React from 'react'
import { useAppDispatch,useAppSelector } from '../../app/hooks.ts';

import type {  FormState, ReactionName } from './postSlice.ts'
import { reactionAdded } from './postSlice.ts'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

interface ReactionButtonsProps {
  post:  FormState
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([stringName, emoji]) => {
      // Ensure TS knows this is a _specific_ string type
      const reaction = stringName as ReactionName
      return (
        <button
          key={reaction}
          type="button"
          className="muted-button reaction-button"
          onClick={() => dispatch(reactionAdded({ id: post.id, reaction }))}
        >
          {emoji} {post.reactions[reaction]}
        </button>
      )
    }
  )

  return <div>{reactionButtons}</div>
}