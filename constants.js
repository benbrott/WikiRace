export const DEFAULT_SETTINGS = {
    random: 'all'
};

export const isIPhoneX = (platform, dimensions) => {
    const { height } = dimensions;
    return platform === 'ios' && height === 812;
}

export const isLandscape = (dimensions) => {
    const { width, height } = dimensions;
    return width > height;
}

export const isIPhoneXLandscape = (platform, dimensions) => {
    const { width } = dimensions;
    return platform === 'ios' && width === 812;
}

export const COLOR_MAIN = '#AC4338';
export const COLOR_SECONDARY = '#417983';
export const BUTTON_HEIGHT = 25;
export const IPHONEX_PADDING = 40;

export const POPULAR_PAGES = [
    {title: 'Sidney Crosby'},
    {title: 'Kanye West'},
    {title: 'Barack Obama'},
    {title: "Pan's Labyrinth"}
];
