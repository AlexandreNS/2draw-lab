import React from 'react'
import Button from '@material-ui/core/Button';
import { useCanvas } from './../contexts/CanvasContext'

export const ClearButton = () => {
  const { clearCanvas } = useCanvas()

  return <Button onClick={clearCanvas} variant="contained" color="primary">
    Limpar
  </Button>
}