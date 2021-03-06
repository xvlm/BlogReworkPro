/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/24
 * Description:
 */

import React, {Component, PropTypes} from 'react';

import Modal from 'react-modal';
import QrCode from 'qrcode.react';

import config from '../../config';
import * as themeReducer from '../reducers/theme';
import * as shareInfoReducer from '../reducers/shareInfo';

import '../theme/css/share.less';


export default class Share extends Component {
    static propTypes = {
        theme: PropTypes.object,
        info: PropTypes.object
    };

    static defaultProps = {
        theme: themeReducer.defaultState,
        info: shareInfoReducer.defaultState
    };

    state = {
        openModal: false
    };

    openModal(event) {
        event.preventDefault();
        this.setState({openModal: true});
    }

    closeModal() {
        this.setState({openModal: false});
    }

    format(url: string) {
        const data = this.props.info;
        return url.replace(/\{\{(\w)(\w*)\}\}/g, (m, fix, k) => {
            const key = (fix + k).toLowerCase();
            return (data[key] || '');
        });
    }

    render() {
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                overflow: 'auto',
                zIndex: 20
            },
            content: {
                width: 180,
                height: 360,
                margin: 'auto',
                backgroundColor: this.props.theme.getIn(['current', 'color']),
                opacity: 0.9,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '20px'
            }
        };
        return (
            <div id="share">
                <a
                    className="icon-share icon-font duration-main"
                    onClick={::this.openModal}
                />
                <Modal
                    key='modal'
                    isOpen={this.state.openModal}
                    onRequestClose={::this.closeModal}
                    style={modalStyle}

                >
                    <div id="share-modal">
                        <div
                            style={{
                                marginLeft: 5,
                                border: '5px solid #eee'
                            }}
                        >
                            <QrCode
                                key='qr-code'
                                value={this.props.info.url}
                                size={160}
                                fgColor={this.props.theme.getIn(['current', 'color'])}
                                level='M'
                            />
                        </div>
                        {
                            config.shareTemplates.map((template, index) =>
                                <a
                                    key={index}
                                    target='_blank'
                                    href={this.format(template[1])}
                                    className={`icon-font icon ${template[0]}`}
                                />
                            )
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}
