export const getScreenBounds = (context) => {
  const [  screenFirst ] = context.matrix.screen([ 0, 0 ]);
  const [ screenSecond ] = context.matrix.screen([ 10, 0 ]);

  const screenStart = -screenFirst;
  const screenWidth = screenSecond - screenFirst;

  const offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));
  const count  = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;

  return { offset, count };
};
