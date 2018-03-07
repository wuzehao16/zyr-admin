import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';
const authority = () => getAuthority().split(',')
let Authorized = RenderAuthorized(authority());

// Reload the rights component
const reloadAuthorized = () => {
   Authorized = RenderAuthorized(authority());
};

export { reloadAuthorized };
export default Authorized;
