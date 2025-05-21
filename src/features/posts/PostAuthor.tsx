import React from 'react'
import { useAppDispatch,useAppSelector } from '../../app/hooks.ts'
import { selectUserById } from '../users/userSlice.ts'

interface PostAuthorProps {
  userId: string
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector(state => selectUserById(state, userId))

  return <span>by {author?.name ?? 'Unknown author'}</span>
}