import { GRID_COL_COUNT, GRID_ROW_COUNT } from '../../constants';
import { root } from '../../main';
import { gameManager } from '../../store/gameManager';
import { gridState, isPausedState } from '../../store/main';
import { createMatrix } from '../../utils/array/createMatrix';
import './SettingsBar.css';

export const SettingsBar = () => {
    const settingsBarDiv = document.createElement('div');
    settingsBarDiv.className = 'SettingsBar';

    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause';

    const clearAllButton = document.createElement('button');
    clearAllButton.innerText = 'Clear all';

    const handlePauseToggle = () => {
        isPausedState.current = !isPausedState.current;
    };

    const handleClearAll = () => {
        gridState.current = createMatrix<boolean>({countRow: GRID_ROW_COUNT, countCol: GRID_COL_COUNT, defaultValue: false});
    }

    isPausedState.onUpdate((isPaused) => {
        if (isPaused) {
            pauseButton.innerText = 'Resume';
            gameManager.pause();
        } else {
            pauseButton.innerText = 'Pause';
            gameManager.resume();
        }
    });

    settingsBarDiv.appendChild(pauseButton);
    pauseButton.addEventListener('click', handlePauseToggle);
    settingsBarDiv.appendChild(clearAllButton);
    clearAllButton.addEventListener('click', handleClearAll);
    root.appendChild(settingsBarDiv);

    return () => {
        settingsBarDiv.removeChild(pauseButton);
        pauseButton.removeEventListener('click', handlePauseToggle);
        clearAllButton.removeEventListener('click', handleClearAll);
        root.removeChild(settingsBarDiv);
    }
}
