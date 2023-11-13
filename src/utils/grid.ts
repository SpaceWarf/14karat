export interface Position {
  x: number,
  y: number,
}

export const getRandomPosition = (gridWidth: number, gridHeight: number): Position => {
  const x = Math.floor(Math.random() * gridWidth);
  const y = Math.floor(Math.random() * gridHeight);
  return { x, y };
};

export const isPositionChosen = (position: Position, positions: Position[]): boolean => {
  return positions.every(pos => pos.x !== position.x || pos.y !== position.y);
}