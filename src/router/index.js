import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: "http://numerical-methods-frontend.vercel.app",
  routes: [
    {
      path: "/gaussElimination",
      name: "gaussElimination",
      component: () => import("../components/methods/GaussElimination.vue"),
    },
    {
      path: "/gaussJordan",
      name: "gaussJordan",

      component: () => import("../components/methods/Gauss-Jordan.vue"),
    },
    {
      path: "/LU",
      name: "LUcomposition",

      component: () => import("../components/methods/LUDecomposition .vue"),
    },
    {
      path: "/jacobi",
      name: "jacobi",

      component: () => import("../components/methods/Jacobi-Iteration .vue"),
    },
    {
      path: "/gaussSeidel",
      name: "gaussSeidel",

      component: () => import("../components/methods/Gauss-Seidel.vue"),
    },
  ],
});

export default router;

//**************************extre methods ********************//
// {
//   path: "/conjugateGradient",
//   name: "conjugateGradient",

//   component:() => import("../components/methods/ConjugateGradient.vue"),
// },
// {
//   path: "/newtonInterpolation",
//   name: "newtonInterpolation",

//   component:() => import("../components/methods/NewtonInterpolation.vue"),
// },
// {
//   path: "/lagrangeInterpolation",
//   name: "lagrangeInterpolation",

//   component:() => import("../components/methods/LagrangeInterpolation.vue"),
// },
// {
//   path: "/splineInterpolation",
//   name: "splineInterpolation",

//   component:() => import("../components/methods/SplineInterpolation.vue"),
// },
// {
//   path: "/linearRegression",
//   name: "linearRegression",

//   component:() => import("../components/methods/LinearRegression.vue"),
// },
// {
//   path: "/polynomialRegression",
//   name: "polynomialRegression",

//   component:() => import("../components/methods/PolynomialRegression.vue"),
// },
// {
//   path: "/multipleLinearRegression",
//   name: "multipleLinearRegression",

//   component:() => import("../components/methods/MultipleLinearRegression.vue"),
// },
// {
//   path: "/nonlinearRegression",
//   name: "nonlinearRegression",

//   component:() => import("../components/methods/NonlinearRegression.vue"),
// },
// {
//   path: "/lagrangePolynomial",
//   name: "lagrangePolynomial",

//   component:() => import("../components/methods/LagrangePolynomial.vue"),
// },
// {
//   path: "/newtonPolynomial",
//   name: "newtonPolynomial",

//   component:() => import("../components/methods/NewtonPolynomial.vue"),
// },
// {
//   path: "/linearSpline",
//   name: "linearSpline",

//   component:() => import("../components/methods/LinearSpline.vue"),
// },
// {
//   path: "/quadraticSpline",
//   name: "quadraticSpline",
// }
