/* A* search: heuristic shortest pathfinding algorithm */

import { MinPriorityQueue } from "./minPQ.ts";

class AStar {
    shortestPath(
        grid: string[][], start: number[], end: number[]
    ): { path: number[][], found: boolean } {
        const distance = (a: number[]) =>
            Math.abs(a[0] - end[0]) + Math.abs(a[1] - end[1]);

        const toKey = (pos: number[]) => pos.join(',');

        const [ROW, COL] = [grid.length, grid[0].length];
        const dirs = [[-1, 0], [0, -1], [1, 0], [0, 1]];

        const parents = new Map<string, string>();
        const gCost = new Map<string, number>(
            [[toKey(start), 0]]
        );
        const closed = new Set<string>();
        const opened = new MinPriorityQueue<number[]>(
            (pos: number[]) => gCost.get(toKey(pos))! + distance(pos),
            toKey, [start]
        );

        while (!opened.isEmpty()) {
            const curr = opened.delMin()!;
            const currKey = toKey(curr);

            // check if reached goal
            if (distance(curr) === 0)
                return { path: this.reconstructPath(parents, curr), found: true };

            // not the goal cell -> close it, avoid circular path
            closed.add(currKey);

            for (const [dR, dC] of dirs) {
                const [newR, newC] = [curr[0] + dR, curr[1] + dC];
                const neiKey = toKey([newR, newC]);

                // out of matrix or blocked/closed neighbor -> skip
                if (newR < 0 || newR >= ROW ||
                    newC < 0 || newC >= COL ||
                    grid[newR][newC] !== '0' || closed.has(neiKey))
                    continue;

                // new G cost for every neighbor
                const accumulateG = gCost.get(currKey)! + 1;

                /* 1. IF haven't reached this neighbor before OR
                * 2. IF the new path is better, then
                * -> record best path, cost, add to PQ */
                if (!gCost.has(neiKey) || accumulateG < gCost.get(neiKey)!) {
                    parents.set(neiKey, currKey);
                    gCost.set(neiKey, accumulateG);

                    if (!opened.contains(neiKey)) {
                        opened.insert([newR, newC]);
                    } else {
                        opened.decreaseKey([newR, newC]);
                    }
                }
            }
        }

        return { path: [], found: false };
    }

    private reconstructPath(
        parents: Map<string, string>, curr: number[]
    ): number[][] {
        const toKey = (pos: number[]) => pos.join(',');
        const toPos = (key: string) => key.split(',').map(Number);

        const path: number[][] = [curr];

        while (parents.has(toKey(curr))) {
            curr = toPos(parents.get(toKey(curr))!);
            path.push(curr);
        }

        return path.reverse();
    }

    shortestDist(
        grid: string[][], start: number[], end: number[]
    ): number {
        return this.shortestPath(grid, start, end).path.length - 1;
    }

    public static run(): void {
        const grid: string[][] = [
            ['0', '0', '0', '0', '0', '0', '1', '0'],
            ['0', '1', '0', '1', '0', '0', '0', '0'],
            ['0', '0', '0', '1', '0', '1', '0', '0'],
            ['0', '1', '0', '1', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '1', '1', '0'],
            ['0', '0', '1', '0', '0', '0', '0', '0'],
        ];
        const [ROW, COL] = [grid.length, grid[0].length];

        const start: number[] = [0, 0];
        const end: number[] = [ROW - 1, COL - 1];

        const dist = new AStar().shortestDist(grid, start, end);
        const { path, found } = new AStar().shortestPath(grid, start, end);

        console.log('Shortest distance:', dist);

        if (!found) {
            console.log('No path found!');
            return;
        }

        console.log(path.map(
            val => val.join(',')
        ).join(' -> '));
    }
}

AStar.run();