import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './PreviewImage.module.scss';

const cx = classNames.bind(styles);

function PreviewImage({ setImageState }) {
    const [image, setImage] = useState(
        process.env.PUBLIC_URL + '/default-avatar.png'
    );

    const onSelectImage = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            try {
                const dataUrl = await readImageAsDataURL(image);
                setImage(dataUrl);
            } catch (error) {
                console.log('Lỗi khi đọc tệp tin:', error);
            }
            setImageState(image);
        }
    };

    const readImageAsDataURL = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result));
            reader.addEventListener('error', () => reject(reader.error));
            reader.readAsDataURL(image);
        });
    };

    return (
        <div className={cx('preview-image')}>
            <input
                type="file"
                accept="image/*"
                onChange={onSelectImage}
                id="input-image"
                className={cx('input-image')}
            />

            <div className={cx('wrapper-image')}>
                <div className={cx('overlay-image')}>
                    <label htmlFor="input-image" className={cx('rounded')}>
                        Upload image
                    </label>
                    <button
                        className={cx('rounded', 'reset-image')}
                        onClick={() => {
                            setImage(
                                process.env.PUBLIC_URL + '/default-avatar.png'
                            );
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowsRotate}
                            className={cx('icon')}
                        />
                    </button>
                </div>
                <img src={image} alt="" className={cx('image', 'rounded')} />
            </div>
        </div>
    );
}

export default PreviewImage;
