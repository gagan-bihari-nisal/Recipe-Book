import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function withParams(Component) {
  return props => <Component {...props} params={useParams()} location={useLocation()} />;
}
