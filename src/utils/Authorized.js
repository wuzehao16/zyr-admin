import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';
const authority = getAuthority().split(',')
const Authorized = RenderAuthorized(authority);
export default Authorized;
