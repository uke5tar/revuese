export default {
  methods: {
    movableElement(closestComponent, component) {
      const movable = {};

      const getMovableData = (e) => {
        const closestDialog = e.target.closest(closestComponent);

        if (e.button === 0 && closestDialog != null && e.target.offsetParent.classList.contains(component)) {
          movable.el = closestDialog;
          movable.mouseStartX = e.clientX;
          movable.mouseStartY = e.clientY;
          movable.elStartX = movable.el.getBoundingClientRect().left;
          movable.elStartY = movable.el.getBoundingClientRect().top;
          movable.el.style.position = 'fixed';
          movable.el.style.margin = 0;
          movable.oldTransition = movable.el.style.transition;
          movable.el.style.transition = 'none';
        }
      };

      const moveElem = (e) => {
        if (movable.el === undefined) return;

        movable.el.style.left = `${Math.min(Math.max(movable.elStartX + e.clientX - movable.mouseStartX, 0),
          window.innerWidth - movable.el.getBoundingClientRect().width)}px`;

        movable.el.style.top = `${Math.min(Math.max(movable.elStartY + e.clientY - movable.mouseStartY, 0),
          window.innerHeight - movable.el.getBoundingClientRect().height)}px`;
      };

      const endMoveElem = () => {
        if (movable.el === undefined) return;
        movable.el.style.transition = movable.oldTransition;
        movable.el = undefined;
      };

      const recalculateMovablePosition = setInterval(() => {
        const dialog = document.querySelector(closestComponent);
        if (dialog === null) return;

        dialog.style.left = `${Math.min(parseInt(dialog.style.left, 10),
          window.innerWidth - dialog.getBoundingClientRect().width)}px`;

        dialog.style.top = `${Math.min(parseInt(dialog.style.top, 10),
          window.innerHeight - dialog.getBoundingClientRect().height)}px`;
      }, 100);


      const init = () => {
        document.addEventListener('mousedown', getMovableData);
        document.addEventListener('mousemove', moveElem);
        document.addEventListener('mouseup', endMoveElem);
      };

      const destroy = () => {
        clearInterval(recalculateMovablePosition);

        document.removeEventListener('mousedown', getMovableData);
        document.removeEventListener('mousemove', moveElem);
        document.removeEventListener('mouseup', endMoveElem);
      };

      return {
        init,
        destroy,
      };
    },
  },
};
