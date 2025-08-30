import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token'); // Cambia 'token' por la clave que uses

  const setHeaders: Record<string, string> = {
    'Accept': 'application/json'
  };

  if (token) {
    setHeaders['Authorization'] = `Bearer ${token}`;
  }

  const cloned = req.clone({ setHeaders });
  return next(cloned);
};
