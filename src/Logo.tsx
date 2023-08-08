import logo from './logo.svg';

export const Logo = ({ className }: { className: string }) => (
    <img className={className} src={logo} alt="parcellab logo" />
);
