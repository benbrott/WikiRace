export const defaultSettings = {
    random: 'all'
};

export const isIphoneX = (platform, dimensions) => {
    const { height, width } = dimensions;
    return (platform === 'ios' && (height === 812 || width === 812));
}

export const COLOR_MAIN = '#AC4338';
export const COLOR_SECONDARY = '#417983';
