
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log('An unexpected error ocurred.');
        console.log('Global error is: ', error);
    }
}