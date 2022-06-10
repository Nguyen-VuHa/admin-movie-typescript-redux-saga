import { ImageList, ImageListItem } from '@mui/material';
import { Container } from '@mui/system';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './dashboard.module.scss';

const cx = classNames.bind(styles);

export interface DashboardProps {

}

const imagesList = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bird',
      imgPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },

    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },

    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
     {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
     {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    }, {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
          'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81',
    },
  ];

const DashBoard = (props: DashboardProps) => {
 
    return (
        <Container maxWidth="lg">
            <ImageList sx={{ width: '100%', height: '80vh' }} variant="woven" cols={3} gap={8}>
                { 
                    imagesList.map((item, idx) => (
                        <ImageListItem key={idx}>
                        <img
                            src={`${item.imgPath}?w=161&fit=crop&auto=format`}
                            srcSet={`${item.imgPath}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.label}
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))
                }
            </ImageList>
        </Container>
    )
}

export default DashBoard