export function padding(top, right, bottom, left) {
  return {
    paddingTop: top ?? undefined,
    paddingRight: right ?? undefined,
    paddingBottom: bottom ?? undefined,
    paddingLeft: left ?? undefined,
  };
}