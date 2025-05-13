import { toast } from "sonner";
import * as React from 'react';

export const notify = (userName: string, amount: number) => {
  toast(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'strong',
        null,
        userName !== null && userName !== undefined ? userName : "Anonymous"
      ),
      ' added an expense of ',
      React.createElement(
        'strong',
        null,
        '₨ ',
        amount
      )
    ),
    {
      duration: 5000,
      className: "bg-white text-black border border-green-300 shadow-lg",
    }
  );
};