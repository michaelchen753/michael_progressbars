import React from 'react';
import axiosMock from 'axios';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import App from './App';


jest.mock('axios');

describe('App should render correctly', () => {
  describe('App component', () => {
    it('should render', () => {
      render(< App / >);
      expect(screen.getByText('Progress Bars Demo'))
        .toBeInTheDocument();
    });
    
    it('should display progressbars when the page was loaded successfully', async () => {
      const mockData = {
        data: {
          'buttons': [16, 26, -34, -24],
          'bars': [32, 54, 85],
          'limit': 150,
        },
      };
      
      jest.spyOn(axiosMock, 'get')
        .mockImplementation(() => {
          return Promise.resolve(mockData);
        });


      render(< App / >);
      
      await waitFor(() => {
        // can change progress bar
        expect(screen.queryByTestId('progressBarSelect'))
          .toBeInTheDocument();
        fireEvent.change(
          screen.queryByTestId('progressBarSelect'), {
            target: {
              value: '2'
            }
          }, );
        expect(screen.queryByTestId('progressBarSelect')
            .value)
          .toBe('2');
        
        // can click button to add progress
        expect(screen.queryByTestId('maintain_button_0'))
          .toBeInTheDocument();
        expect(screen.queryByTestId('maintain_button_1'))
          .toBeInTheDocument();
        expect(screen.queryByTestId('maintain_button_2'))
          .toBeInTheDocument();
        expect(screen.queryByTestId('maintain_button_3'))
          .toBeInTheDocument();
        
        // click the '+26' button to add progress for progress bar 2
        expect(screen.queryByTestId('progressbar_indicator_2'))
          .toBeInTheDocument();
        for(let i = 1; i <= 10; i++) {
          fireEvent.click(screen.queryByTestId('maintain_button_1'));
          expect(screen.queryByTestId('progressbar_indicator_2')
              .innerHTML)
            .toBe(`${(54+26*i) > 150 ? 150 : (54+26*i)}%`);
        }
        
        // click the '-34' button to add progress for progress bar 2
        for(let i = 1; i <= 10; i++) {
          fireEvent.click(screen.queryByTestId('maintain_button_2'));
          expect(screen.queryByTestId('progressbar_indicator_2')
              .innerHTML)
            .toBe(`${(150-34*i) < 0 ? 0 : (150-34*i)}%`);
        }
        
      });
      
    });
    
    it('should display the error message when the response.data is null', async () => {
      const mockData = {
        data: null,
      };
      
      jest.spyOn(axiosMock, 'get')
        .mockImplementation(() => {
          return Promise.resolve(mockData);
        });
      
      render(< App / >);
      
      await waitFor(() => {
        expect(screen.queryByText('Progress Bars Demo'))
          .toBeInTheDocument();
        expect(screen.queryByText('Response data is null.'))
          .toBeInTheDocument();
      });
      
    });
    
  });
});


