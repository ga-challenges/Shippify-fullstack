import { render, screen } from '@testing-library/react';
import InputLabel from './Label';

import '@testing-library/jest-dom'

describe('InputLabel component', () => {
    it('should render label with children text', () => {
        render(<InputLabel>Label Text</InputLabel>);
        expect(screen.getByText('Label Text')).toBeInTheDocument();
    });

    it('should have correct htmlFor attribute when id is provided', () => {
        render(<InputLabel id="input-id">Label Text</InputLabel>);
        expect(screen.getByText('Label Text').closest('label')).toHaveAttribute('for', 'input-id');
    });

    it('should not have htmlFor attribute when id is not provided', () => {
        render(<InputLabel>Label Text</InputLabel>);
        expect(screen.getByText('Label Text').closest('label')).not.toHaveAttribute('for');
    });
});
