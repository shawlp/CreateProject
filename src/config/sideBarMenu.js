const barMenu = [
    {
        name: '用户',
        flag: 'user',
        icon: 'user',
        children: [
            { name: '汤姆', url: '/user/tom', breadItem: ['用户', '汤姆'] },
            { name: '比尔', url: '/user/bill', breadItem: ['用户', '比尔'] },
            { name: '爱丽斯', url: '/user/alex', breadItem: ['用户', '爱丽斯'] },
        ]
    },
    {
        name: 'Home',
        icon: 'home',
        flag: 'home',
        children: [
            { name: 'Tom2', url: '/home/tom2' },
            { name: 'Bill2', url: '/home/bill2' },
            { name: 'Alex2', url: '/home/alex2' },
        ]
    },
];

export default barMenu;