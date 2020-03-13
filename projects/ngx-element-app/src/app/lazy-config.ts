export const lazyConfig = [
    {
        selector: 'talk',
        loadChildren: () => import('./talk/talk.module').then(m => m.TalkModule)
    },
    {
        selector: 'sponsor',
        loadChildren: () => import('./sponsor/sponsor.module').then(m => m.SponsorModule)
    }
];
