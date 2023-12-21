import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Simulator from './Simulator';

test('Renderiza el componente sin errores', () => {
    render(<Simulator />);
    const linkElement = screen.getByText(/Iniciar simulación/i);
    expect(linkElement).toBeInTheDocument();
});


test('Envío del formulario con operaciones asíncronas', async () => { // Haz la función de prueba asíncrona
    render(<Simulator />);
    const investmentInput = screen.getByLabelText('Inversión mensual en CLP');
    const startDateInput = screen.getByLabelText('Fecha de inicio');
    const endDateInput = screen.getByLabelText('Fecha de fin');
    const submitButton = screen.getByText('Iniciar simulación');

    fireEvent.change(investmentInput, { target: { value: '1000' } });
    fireEvent.change(startDateInput, { target: { value: '2023-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-02' } });
    await fireEvent.click(submitButton); // Usa await antes de la operación asíncrona

    // Aquí puedes agregar expectativas para verificar si el estado se actualiza correctamente.
});