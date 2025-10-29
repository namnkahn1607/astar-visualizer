type NodeType = 'empty' | 'wall' | 'start' | 'end' | 'path' |  'visited' | 'current';

interface Position {
    row: number;
    col: number;
}

interface GridNode {
    position: Position;
    type: NodeType;
    g: number; // cost from start
    h: number; // heuristic to end
    f: number; // total cost (g + h)
    parent: Position | null;
}

interface AStarState {
    openSet: Array<Position>;
    closedSet: Array<Position>;
    current: Position | null;
    path: Array<Position>;
    finished: boolean;
}

export type { AStarState, GridNode, NodeType, Position };