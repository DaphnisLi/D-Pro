import { createStyles } from '../../../../styles/instance'

export const useStyles = createStyles(({ css, token }) => {
  const { textColor } = token
  const boxShadowBorder = '0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05)'
  const boxShadowCommon = '0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15)'

  return {
    wrapper: css`
      display: flex;
      box-sizing: border-box;
      transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)
        scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1));
      transform-origin: 0 0;
      touch-action: manipulation;
      width: 160px;
      height: 32px;
      background: #F8F9FF;
      border-radius: 4px;
      padding: 0 12px;

      :hover {
        border: 1px solid rgba(29,67,254,0.8);
      }
    `,

    wrapperDragOverlay: css`
      --scale: 1.05;
      --box-shadow: ${boxShadowBorder}, ${boxShadowCommon};
      --box-shadow-picked-up: ${boxShadowBorder},
        -1px 0 15px 0 rgba(34, 33, 81, 0.01),
        0px 15px 15px 0 rgba(34, 33, 81, 0.25);
      z-index: 99;
    `,

    item: css`
      position: relative;
      display: flex;
      flex-grow: 1;
      align-items: center;
      outline: none;
      border-radius: calc(4px / var(--scale-x, 1));
      box-sizing: border-box;
      list-style: none;
      transform-origin: 50% 50%;
      -webkit-tap-highlight-color: transparent;
      font-size: 14px;
      color: ${textColor};
      font-weight: 400;
      white-space: nowrap;
      transform: scale(var(--scale, 1));
      transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
      touch-action: manipulation;
      cursor: grab;

      &:focus-visible {
        box-shadow: 0 0 4px 1px #4c9ffe, ${boxShadowBorder}, ${boxShadowCommon};
      }

      &:hover {
        .remove {
          visibility: visible;
        }
      }
    `,

    dragging: css`
      &:not(.drag-overlay) {
        opacity: var(--dragging-opacity, 0.5);
        z-index: 0;
      }
    `,

    disabled: css`
      color: #999;
      background-color: #f1f1f1;
      cursor: not-allowed;

      &:focus {
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1), ${boxShadowBorder}, ${boxShadowCommon};
      }
    `,

    itemDragOverlay: css`
      cursor: inherit;
      animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
      transform: scale(var(--scale));
      box-shadow: var(--box-shadow-picked-up);
      opacity: 1;
    `,

    remove: css`
      visibility: hidden;
    `,

    checkbox: css`
      margin-right: 8px !important;
    `
  }
})
