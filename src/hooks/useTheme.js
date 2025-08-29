import { useSelector } from 'react-redux';

const useTheme = () => {
    const theme = useSelector((state) => state.theme.theme);
    return theme;
};

export default useTheme;