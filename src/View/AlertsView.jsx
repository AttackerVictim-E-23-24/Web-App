import { toast } from 'react-toastify';

function showToken(token) {
  toast(`Token: ${token}`);
}

export { showToken };