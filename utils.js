export function padding(top, right, bottom, left) {
  return {
    paddingTop: top ?? undefined,
    paddingRight: right ?? undefined,
    paddingBottom: bottom ?? undefined,
    paddingLeft: left ?? undefined,
  };
}

export const calculateParsentige = (pEarned, pPos) => {
  console.log('cool', pEarned, pPos);
  return Math.round((pEarned / pPos) * 100);
};
