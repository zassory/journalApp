import React from 'react'
import { AppRouter } from './router/AppRouter'
import { Route , Routes } from 'react-router-dom';
import { AppTheme } from './theme';

export const JournalApp = () => {
  return (
    <AppTheme>
        <AppRouter />
    </AppTheme>
  )
}
