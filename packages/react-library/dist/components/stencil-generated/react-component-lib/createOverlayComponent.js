import { __rest } from "tslib";
import React from 'react';
import ReactDOM from 'react-dom';
import { attachProps } from './utils';
export const createOverlayComponent = (displayName, controller) => {
    const didDismissEventName = `on${displayName}DidDismiss`;
    const didPresentEventName = `on${displayName}DidPresent`;
    const willDismissEventName = `on${displayName}WillDismiss`;
    const willPresentEventName = `on${displayName}WillPresent`;
    class Overlay extends React.Component {
        constructor(props) {
            super(props);
            this.el = document.createElement('div');
            this.handleDismiss = this.handleDismiss.bind(this);
        }
        static get displayName() {
            return displayName;
        }
        componentDidMount() {
            if (this.props.isOpen) {
                this.present();
            }
        }
        componentWillUnmount() {
            if (this.overlay) {
                this.overlay.dismiss();
            }
        }
        handleDismiss(event) {
            if (this.props.onDidDismiss) {
                this.props.onDidDismiss(event);
            }
            if (this.props.forwardedRef) {
                this.props.forwardedRef.current = undefined;
            }
        }
        async componentDidUpdate(prevProps) {
            if (this.overlay) {
                attachProps(this.overlay, this.props, prevProps);
            }
            if (prevProps.isOpen !== this.props.isOpen && this.props.isOpen === true) {
                this.present(prevProps);
            }
            if (this.overlay && prevProps.isOpen !== this.props.isOpen && this.props.isOpen === false) {
                await this.overlay.dismiss();
            }
        }
        async present(prevProps) {
            const _a = this.props, { children, isOpen, onDidDismiss, onDidPresent, onWillDismiss, onWillPresent } = _a, cProps = __rest(_a, ["children", "isOpen", "onDidDismiss", "onDidPresent", "onWillDismiss", "onWillPresent"]);
            const elementProps = Object.assign(Object.assign({}, cProps), { ref: this.props.forwardedRef, [didDismissEventName]: this.handleDismiss, [didPresentEventName]: (e) => this.props.onDidPresent && this.props.onDidPresent(e), [willDismissEventName]: (e) => this.props.onWillDismiss && this.props.onWillDismiss(e), [willPresentEventName]: (e) => this.props.onWillPresent && this.props.onWillPresent(e) });
            this.overlay = await controller.create(Object.assign(Object.assign({}, elementProps), { component: this.el, componentProps: {} }));
            if (this.props.forwardedRef) {
                this.props.forwardedRef.current = this.overlay;
            }
            attachProps(this.overlay, elementProps, prevProps);
            await this.overlay.present();
        }
        render() {
            return ReactDOM.createPortal(this.props.isOpen ? this.props.children : null, this.el);
        }
    }
    return React.forwardRef((props, ref) => {
        return React.createElement(Overlay, Object.assign({}, props, { forwardedRef: ref }));
    });
};
