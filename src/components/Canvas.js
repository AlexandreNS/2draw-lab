import React, { useEffect } from "react";
import { useCanvas } from "./../contexts/CanvasContext";

export function Canvas(props) {
  const { width, height, options = { color: '#000', stroke: 5 } } = props

  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    changeOptions
  } = useCanvas();

  useEffect(() => {
    prepareCanvas(width, height);
  }, [width, height]);

  useEffect(() => {
    changeOptions(options);
  }, [options]);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}