function imagePathfixer(fullPath) {
    return fullPath.replace(/^wwwroot\\/, 'http://104.248.88.55:4040/');
}

export { imagePathfixer };