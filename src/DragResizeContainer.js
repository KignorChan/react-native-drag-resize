import React, {PureComponent} from 'react';
import {
  View,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Drag resize container.
 * Allow calculate limitation by container size.
 */
export class DragResizeContainer extends PureComponent {

  render() {
    const {
      style,
      onInit,
      children,
    } = this.props;

    return (
      <View
        ref={view => {
          this.canvas = view;
        }}
        style={style}
        onLayout={() => {
          if(Platform.OS === "ios"){
            this.canvas.measure(
              (fx, fy, w, h, x, y) => {
                onInit({
                  x: 0,
                  y: 0,
                  w,
                  h,
                });
              }
            );
          }else{
            this.canvas.measureInWindow((x, y, w, h) => {
                onInit({
                  x: 0,
                  y: 0,
                  w,
                  h,
                });
            });
          }
        }}
      >
        {children}
      </View>
    );
  }
};

DragResizeContainer.propTypes = {
  onInit: PropTypes.func.isRequired,
  style: PropTypes.object,
};
