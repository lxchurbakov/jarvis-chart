import React from 'react';

/**
 * Events Register
 *
 * Click
 * Zoom
 * Drag
 * Path
 *
 */
class EventsWindow extends React.Component {
  constructor () {
    super();

    this.mouse = {
      in: false,
      down: false,
      position: false
    };
  }

  /**
   * Register mousepath and dragX events
   */
  mouseMove = (e) => {
    if (this.mouse.position) {
      const distanceX = e.clientX - this.mouse.position.x;
      const distanceY = e.clientY - this.mouse.position.y;

      if (distanceX !== 0 || distanceY !== 0) {
        this.props.onPath(distanceX, distanceY, e);

        if (this.mouse.down) {
          this.props.onDrag(distanceX, distanceY, e);
        }
      }
    }

    this.mouse.position = { x: e.clientX, y: e.clientY };
  }

  mouseOver = () => {
    this.mouse.in = true;
  }

  mouseOut = () => {
    this.mouse.in = false;
  }

  mouseDown = () => {
    this.mouse.down = true;
  }

  mouseUp = () => {
    this.mouse.down = false;
  }

  click = (e) => {
    this.props.onClick(e);
  }

  wheel = (e) => {
    if (this.mouse.in) {
      const delta = e.deltaY;

      this.props.onZoom(delta, e);
    }
  }

  componentDidMount () {
    console.log('listener has been mounted');
    console.log(this.div);

    this.div.addEventListener('mouseover', this.mouseOver);
    this.div.addEventListener('mouseout', this.mouseOver);
    this.div.addEventListener('mousedown', this.mouseDown);
    this.div.addEventListener('mouseup', this.mouseUp);
    this.div.addEventListener('mousemove', this.mouseMove);
    this.div.addEventListener('wheel', this.wheel);
    this.div.addEventListener('click', this.click);
  }

  render () {
    const { children } = this.props;

    return (
      <div ref={div => this.div = div}>
        {children}
      </div>
    )
  }
};

export default EventsWindow;
