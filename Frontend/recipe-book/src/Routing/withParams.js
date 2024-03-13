import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function withParams(Component) {
  return props => <Component {...props} params={useParams()} location={useLocation()} navigate={useNavigate()} />;
}
