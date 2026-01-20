import { ILayoutComponent } from "@theming/lib/layout/layout";
import { Index } from "ts-functional/dist/types";

/**
 * Checks if a path matches a glob-like pattern.
 * Supports:
 * - "*" (match all)
 * - "/path/*" (prefix match)
 * - "/path/exact" (exact match)
 */
/**
 * Checks if a single pattern matches the path.
 */
const matchSinglePattern = (pattern: string, path: string): boolean => {
    const trimmed = pattern.trim();
    if (trimmed === "*") return true;
    if (trimmed.endsWith("/*")) {
        const prefix = trimmed.slice(0, -2);
        return path.startsWith(prefix);
    }
    return trimmed === path;
};

/**
 * Calculates the specificity of a single pattern.
 */
const getSingleSpecificity = (pattern: string): number => {
    const trimmed = pattern.trim();
    if (trimmed === "*") return 0;
    if (trimmed.endsWith("/*")) return trimmed.length;
    return trimmed.length + 1000;
};

/**
 * Checks if a path matches a glob-like pattern (supports comma-separated patterns).
 */
export const matchRoute = (pattern: string, path: string): boolean => {
    return pattern.split(',').some(p => matchSinglePattern(p, path));
};

/**
 * Gets the specificity of the best matching sub-pattern.
 * Returns -1 if no match.
 */
const getMatchSpecificity = (pattern: string, path: string): number => {
    const subPatterns = pattern.split(',');
    let maxSpecificity = -1;

    for (const p of subPatterns) {
        if (matchSinglePattern(p, path)) {
            const score = getSingleSpecificity(p);
            if (score > maxSpecificity) {
                maxSpecificity = score;
            }
        }
    }
    return maxSpecificity;
};

/**
 * Finds the components for the most specific matching route in the table.
 */
export const findMatchingRoute = (path: string, table?: Index<ILayoutComponent[]>): ILayoutComponent[] | undefined => {
    if (!table) return undefined;
    
    const patterns = Object.keys(table);

    // Map patterns to their specificity score for the current path
    const matches = patterns
        .map(pattern => ({ pattern, score: getMatchSpecificity(pattern, path) }))
        .filter(match => match.score !== -1);

    if (matches.length === 0) return undefined;

    // Sort by specificity (descending)
    matches.sort((a, b) => b.score - a.score);

    // Return the best match
    return table[matches[0].pattern];
};
