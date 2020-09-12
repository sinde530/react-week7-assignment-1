import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  fetchAccessToken,
  fetchAddReview,
} from '../services/api';

export function setRegions(regions) {
  return {
    type: 'setRegions',
    payload: { regions },
  };
}

export function setCategories(categories) {
  return {
    type: 'setCategories',
    payload: { categories },
  };
}

export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: { restaurants },
  };
}

export function setRestaurant(restaurant) {
  return {
    type: 'setRestaurant',
    payload: { restaurant },
  };
}

export function selectRegion(regionId) {
  return {
    type: 'selectRegion',
    payload: { regionId },
  };
}

export function selectCategory(categoryId) {
  return {
    type: 'selectCategory',
    payload: { categoryId },
  };
}

export function loadInitialData() {
  return async (dispatch) => {
    const regions = await fetchRegions();
    dispatch(setRegions(regions));

    const categories = await fetchCategories();
    dispatch(setCategories(categories));
  };
}

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const {
      selectedRegion: region,
      selectedCategory: category,
    } = getState();

    if (!region || !category) {
      return;
    }

    const restaurants = await fetchRestaurants({
      regionName: region.name,
      categoryId: category.id,
    });
    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurant({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurant(null));

    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setRestaurant(restaurant));
  };
}

export function setLoginFields({ name, value }) {
  return {
    type: 'setLoginFields',
    payload: {
      name, value,
    },
  };
}

export function setLoginFieldsError(loginFieldsError) {
  return {
    type: 'setLoginFieldsError',
    payload: {
      loginFieldsError,
    },
  };
}

export function setAccessToken(accessToken = '') {
  return {
    type: 'setAccessToken',
    payload: {
      accessToken,
    },
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      loginFields: { email, password },
    } = getState();

    const { accessToken } = await fetchAccessToken({ email, password });
    dispatch(setAccessToken(accessToken));
    dispatch(setLoginFieldsError(!accessToken || Object.keys(accessToken).length === 0));
  };
}

export function setReviewFields({ name, value }) {
  return {
    type: 'setReviewFields',
    payload: {
      name, value,
    },
  };
}

export function requestAddReview(restaurantId) {
  return async (dispatch, getState) => {
    const { reviewFields: { score, reviewContent }, accessToken } = getState();

    await fetchAddReview({
      accessToken, score, reviewContent, restaurantId,
    });
  };
}