import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md  text-sidebar-primary-foreground">
                <img className="size-full" src="/book.png" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 text-wrap truncate leading-tight font-semibold">SMP NUSA PUTRA TANGERANG</span>
            </div>
        </>
    );
}
