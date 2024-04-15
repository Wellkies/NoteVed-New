import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from './Store';
export const  useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const dispatch=useDispatch()