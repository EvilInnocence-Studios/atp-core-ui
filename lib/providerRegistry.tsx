const providers: Array<React.ComponentType<{ children: React.ReactNode }>> = [];

export const ProviderResistry = {
    register: (provider: React.ComponentType<{ children: React.ReactNode }>) => {
        providers.push(provider);
    },
    unregister: (provider: React.ComponentType<{ children: React.ReactNode }>) => {
        providers.splice(providers.indexOf(provider), 1);
    },
    getProviders: () => providers,
}

export const AppWrapper = ({ children }: { children: React.ReactNode }) =>
    providers.reduce((children, Provider) => {
        return <Provider>{children}</Provider>;
    }, children);
