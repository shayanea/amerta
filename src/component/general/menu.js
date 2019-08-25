import React, { Component } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

export default class menu extends Component {
	getActiveLink = title => {
		return title === this.props.location.pathname ? "active" : "";
	};

	render() {
		const { active } = this.props;
		return (
			<Menu active={active}>
				<ul>
					<li className={this.getActiveLink("/")}>
						<Link to="/">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512 512"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M506.555,208.064L263.859,30.367c-4.68-3.426-11.038-3.426-15.716,0L5.445,208.064    c-5.928,4.341-7.216,12.665-2.875,18.593s12.666,7.214,18.593,2.875L256,57.588l234.837,171.943c2.368,1.735,5.12,2.57,7.848,2.57    c4.096,0,8.138-1.885,10.744-5.445C513.771,220.729,512.483,212.405,506.555,208.064z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M442.246,232.543c-7.346,0-13.303,5.956-13.303,13.303v211.749H322.521V342.009c0-36.68-29.842-66.52-66.52-66.52    s-66.52,29.842-66.52,66.52v115.587H83.058V245.847c0-7.347-5.957-13.303-13.303-13.303s-13.303,5.956-13.303,13.303v225.053    c0,7.347,5.957,13.303,13.303,13.303h133.029c6.996,0,12.721-5.405,13.251-12.267c0.032-0.311,0.052-0.651,0.052-1.036v-128.89    c0-22.009,17.905-39.914,39.914-39.914s39.914,17.906,39.914,39.914v128.89c0,0.383,0.02,0.717,0.052,1.024    c0.524,6.867,6.251,12.279,13.251,12.279h133.029c7.347,0,13.303-5.956,13.303-13.303V245.847    C455.549,238.499,449.593,232.543,442.246,232.543z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Dashboard</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/users")}>
						<Link to="/users">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512.001 512.001"
								width="30px"
								height="30px"
							>
								<g>
									<g>
										<path
											d="M270.948,302.936c-10.562-14.943-27.525-24.074-45.713-24.765c-0.385-0.043-0.775-0.067-1.171-0.067    c-23.135,0-42.252-17.484-44.859-39.93c6.661-4.851,12.807-11.007,18.254-18.381c11.015-14.913,18.165-33.547,20.816-53.698    c0.812-0.883,1.496-1.911,1.987-3.081c4.664-11.106,7.029-22.963,7.029-35.242c0-47.221-35.702-85.637-79.584-85.637    c-11.349,0-22.36,2.578-32.768,7.665c-3.891,0.328-7.704,1.028-11.365,2.088c-36.686,10.599-57.421,54.957-46.22,98.88    c1.127,4.419,2.56,8.765,4.262,12.916c0.464,1.134,1.114,2.13,1.88,3c4.225,31.022,18.908,56.833,38.989,71.434    c-2.581,22.474-21.712,39.988-44.867,39.988c-0.356,0-0.708,0.019-1.056,0.053C25.185,279.268,0,305.121,0,336.763v63.14    c0,5.891,4.775,10.666,10.666,10.666h188.451c5.89,0,10.666-4.775,10.666-10.666s-4.776-10.666-10.666-10.666H21.331v-52.475    c0-20.585,16.746-37.33,37.33-37.33c0.356,0,0.708-0.019,1.056-0.053c7.683-0.24,15.04-1.786,21.858-4.429l50.497,72.883    c1.992,2.875,5.268,4.592,8.767,4.592c3.499,0,6.775-1.716,8.767-4.592l50.498-72.883c6.819,2.643,14.175,4.189,21.858,4.429    c0.348,0.034,0.7,0.053,1.056,0.053c12.105,0,23.511,5.912,30.51,15.815c2.078,2.94,5.372,4.51,8.719,4.51    c2.128,0,4.277-0.636,6.147-1.957C273.205,314.402,274.347,307.746,270.948,302.936z M109.492,72.377    c2.798-0.808,5.757-1.288,8.796-1.425c1.566-0.07,3.094-0.484,4.482-1.213c7.926-4.164,16.314-6.276,24.933-6.276    c31.47,0,57.174,27.694,58.204,62.162c-6.414-4.85-14.393-7.733-23.035-7.733h-55.779c-2.778,0-5.416-0.872-7.625-2.521    c-1.891-1.411-3.351-3.305-4.224-5.482c-2.015-5.014-7-8.146-12.383-7.806c-5.416,0.347-9.973,4.111-11.338,9.361    c-2.721,10.453-7.801,20.188-14.708,28.455C71.283,108.973,85.213,79.392,109.492,72.377z M84.479,162.705    c9.316-8.54,16.855-18.89,22.119-30.32c0.036,0.027,0.073,0.054,0.11,0.081c5.925,4.422,12.973,6.758,20.384,6.758h55.779    c6.7,0,12.487,3.92,15.234,9.577c-0.071,22.157-6.384,42.854-17.806,58.315c-10.771,14.58-24.785,22.61-39.462,22.61    c-13.583,0-26.807-7.017-37.236-19.757C93.483,197.61,86.788,180.974,84.479,162.705z M140.838,343.031l-40.817-58.912    c10.95-9.086,18.932-21.616,22.307-35.908c5.943,1.86,12.141,2.848,18.509,2.848c6.334,0,12.537-0.961,18.52-2.817    c3.379,14.278,11.358,26.796,22.3,35.876L140.838,343.031z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M455.441,337.455c-0.348-0.034-0.7-0.053-1.056-0.053c-23.167,0-42.305-17.531-44.871-40.023    c13.062-9.512,23.832-23.774,30.931-41.119c1.016,3.324,3.617,6.008,7.039,7.069c1.04,0.322,2.104,0.479,3.157,0.479    c3.232,0,6.36-1.473,8.417-4.114c14.881-19.112,22.616-43.986,21.784-70.041c-0.818-25.56-9.803-49.555-25.303-67.563    c-15.869-18.438-36.819-28.699-59.012-28.911c-1.177-0.048-4.104,0.053-4.577,0.082c-11.402-5.172-23.45-7.588-35.858-7.194    c-25.625,0.819-49.196,13.591-66.369,35.963c-16.688,21.741-25.355,50.098-24.404,79.85c0.161,5.041,0.559,9.683,1.203,14.103    c1.737,12.679,5.23,24.822,10.381,36.091c1.639,3.587,5.124,5.977,9.06,6.213c3.923,0.237,7.681-1.718,9.739-5.083    c0.858-1.403,1.961-3.152,3.178-4.866c4.755,14.445,12.024,27.423,21.253,37.669c3.937,4.371,8.189,8.173,12.667,11.416    c-2.586,22.469-21.715,39.977-44.866,39.977c-0.356,0-0.708,0.019-1.056,0.053c-31.374,1.112-56.558,26.967-56.558,58.607v63.14    c0,5.891,4.776,10.666,10.666,10.666h260.346c5.89,0,10.666-4.775,10.666-10.666v-63.14    C512,364.422,486.815,338.568,455.441,337.455z M290.112,225.625c-1.052-4.108-1.876-8.321-2.467-12.626    c-0.54-3.708-0.868-7.568-1.003-11.799c-0.794-24.837,6.31-48.341,20.004-66.18c13.208-17.208,31.01-27.02,50.128-27.631    c0.639-0.021,14.387-0.795,28.421,6.277c1.569,0.79,3.377,1.157,5.138,1.107c0.202-0.006,5.677-0.265,5.836-0.263    c16.02,0.106,31.362,7.741,43.203,21.497c12.331,14.328,19.487,33.622,20.149,54.329c0.359,11.247-1.221,22.18-4.567,32.239    c-1.008-2.686-2.132-5.331-3.369-7.932c-10.298-21.91-27.633-38.881-48.812-47.788c-2.683-1.128-5.709-1.111-8.378,0.047    c-2.67,1.157-4.75,3.355-5.759,6.085c-1.42,3.836-3.14,7.573-5.116,11.106c-5.584,9.986-16.842,15.927-29.361,15.489    c-1.879-0.064-3.786-0.067-5.666-0.007c-9.223,0.295-18.217,2.053-26.78,5.242C313.255,208.009,299.041,216.018,290.112,225.625z     M316.351,231.43c4.044-2.709,8.347-4.94,12.853-6.643c6.344-2.362,13.063-3.672,19.97-3.893c1.41-0.046,2.838-0.044,4.246,0.005    c20.594,0.705,39.217-9.405,48.718-26.396c0.584-1.045,1.152-2.106,1.701-3.177c9.728,5.993,18.043,14.44,24.295,24.692    c-0.054,0.316-0.1,0.633-0.126,0.959c-1.636,20.237-8.617,38.809-19.658,52.295c-10.429,12.741-23.653,19.757-37.236,19.757    C346.004,289.027,323.666,265.158,316.351,231.43z M352.654,307.492c6.003,1.876,12.194,2.866,18.46,2.866    c6.384,0,12.597-0.994,18.555-2.864c4.284,18.163,16.029,33.466,31.818,42.495c-6.159,22.255-26.627,38.258-50.324,38.258    c-23.699,0-44.166-16.004-50.324-38.26C336.626,340.96,348.371,325.656,352.654,307.492z M490.669,448.537H251.654v-52.475    c0-20.583,16.746-37.33,37.33-37.33c0.356,0,0.708-0.019,1.056-0.053c3.673-0.115,7.274-0.519,10.775-1.209    c9.265,30.416,37.613,52.11,70.347,52.11c32.734,0,61.081-21.694,70.348-52.109c3.5,0.69,7.101,1.094,10.773,1.208    c0.348,0.034,0.7,0.053,1.056,0.053c20.584,0,37.33,16.746,37.33,37.33V448.537z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Users</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/categories")}>
						<Link to="/categories">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512.001 512.001"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M512,256.001c0-10.821-6.012-20.551-15.694-25.398l-38.122-19.061l38.122-19.06c0.001-0.001,0.004-0.002,0.004-0.002    c9.68-4.845,15.692-14.576,15.692-25.397c0-10.819-6.013-20.55-15.694-25.397L281.09,34.08    c-15.712-7.849-34.47-7.849-50.185,0.001L15.691,141.691C6.013,146.534,0,156.264,0,167.084c0,10.821,6.012,20.551,15.694,25.398    l38.121,19.06l-38.126,19.063C6.012,235.45,0,245.18,0,256.001s6.012,20.551,15.694,25.397l38.121,19.061l-38.118,19.059    C6.02,324.353,0.004,334.08,0,344.902c-0.004,10.828,6.008,20.564,15.694,25.412l215.215,107.608    c7.856,3.925,16.471,5.886,25.09,5.886c8.619,0,17.238-1.963,25.095-5.887l215.215-107.608    c9.682-4.845,15.695-14.582,15.691-25.41c-0.004-10.822-6.02-20.549-15.694-25.381l-38.122-19.061l38.126-19.063    C505.988,276.552,512,266.822,512,256.001z M26.225,171.431c-2.339-1.171-2.687-3.226-2.687-4.346s0.35-3.175,2.683-4.343    L241.429,55.138c4.563-2.28,9.568-3.418,14.573-3.418c5.003,0,10.007,1.139,14.567,3.417L485.776,162.74    c2.337,1.17,2.687,3.225,2.687,4.345s-0.348,3.175-2.687,4.346L270.572,279.032c-9.125,4.558-20.019,4.558-29.139,0.001    L26.225,171.431z M485.783,340.575c2.33,1.164,2.679,3.215,2.679,4.336c0.001,1.123-0.348,3.182-2.683,4.35L270.571,456.865    c-9.125,4.558-20.019,4.559-29.139,0.001L26.225,349.262c-2.339-1.171-2.688-3.229-2.687-4.352c0-1.119,0.348-3.171,2.683-4.337    l53.912-26.956l150.776,75.387c7.856,3.925,16.471,5.886,25.089,5.886c8.619,0,17.238-1.963,25.095-5.887l150.772-75.386    L485.783,340.575z M485.778,260.345L270.571,367.949c-9.125,4.558-20.019,4.559-29.139,0.001L26.225,260.347    c-2.339-1.17-2.687-3.225-2.687-4.345c0-1.122,0.348-3.175,2.683-4.344l53.912-26.956l150.776,75.387    c7.855,3.925,16.472,5.886,25.089,5.886c8.617,0,17.237-1.962,25.094-5.888l150.774-75.386l53.908,26.954    c2.339,1.171,2.687,3.225,2.687,4.346C488.462,257.121,488.113,259.176,485.778,260.345z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Categories</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/questions")}>
						<Link to="/questions">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512 512"
								width="30px"
								height="30px"
							>
								<g>
									<g>
										<path
											d="M346,319c-5.522,0-10,4.477-10,10v69c0,27.57-22.43,50-50,50H178.032c-5.521,0-9.996,4.473-10,9.993l-0.014,19.882    l-23.868-23.867c-1.545-3.547-5.081-6.008-9.171-6.008H70c-27.57,0-50-22.43-50-50V244c0-27.57,22.43-50,50-50h101    c5.522,0,10-4.477,10-10s-4.478-10-10-10H70c-38.598,0-70,31.402-70,70v154c0,38.598,31.402,70,70,70h59.858l41.071,41.071    c1.913,1.913,4.47,2.929,7.073,2.929c1.287,0,2.586-0.249,3.821-0.76c3.737-1.546,6.174-5.19,6.177-9.233L188.024,468H286    c38.598,0,70-31.402,70-70v-69C356,323.477,351.522,319,346,319z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M366.655,0h-25.309C261.202,0,196,65.202,196,145.346s65.202,145.345,145.345,145.345h25.309    c12.509,0,24.89-1.589,36.89-4.729l37.387,37.366c1.913,1.911,4.469,2.927,7.071,2.927c1.289,0,2.589-0.249,3.826-0.762    c3.736-1.548,6.172-5.194,6.172-9.238v-57.856c15.829-12.819,28.978-29.012,38.206-47.102    C506.687,190.751,512,168.562,512,145.346C512,65.202,446.798,0,366.655,0z M441.983,245.535    c-2.507,1.889-3.983,4.847-3.983,7.988v38.6l-24.471-24.458c-1.904-1.902-4.458-2.927-7.07-2.927c-0.98,0-1.97,0.145-2.936,0.442    c-11.903,3.658-24.307,5.512-36.868,5.512h-25.309c-69.117,0-125.346-56.23-125.346-125.346S272.23,20,341.346,20h25.309    C435.771,20,492,76.23,492,145.346C492,185.077,473.77,221.595,441.983,245.535z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M399.033,109.421c-1.443-20.935-18.319-37.811-39.255-39.254c-11.868-0.815-23.194,3.188-31.863,11.281    c-8.55,7.981-13.453,19.263-13.453,30.954c0,5.523,4.478,10,10,10c5.522,0,10-4.477,10-10c0-6.259,2.522-12.06,7.1-16.333    c4.574-4.269,10.552-6.382,16.842-5.948c11.028,0.76,19.917,9.649,20.677,20.676c0.768,11.137-6.539,20.979-17.373,23.403    c-8.778,1.964-14.908,9.592-14.908,18.549v24.025c0,5.523,4.478,10,10,10c5.523,0,10-4.477,9.999-10v-23.226    C386.949,148.68,400.468,130.242,399.033,109.421z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M363.87,209.26c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07    c0,2.64,1.071,5.22,2.93,7.08c1.86,1.86,4.44,2.92,7.07,2.92s5.21-1.06,7.07-2.92c1.86-1.87,2.93-4.44,2.93-7.08    C366.8,213.7,365.729,211.12,363.87,209.26z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M275,310H64c-5.522,0-10,4.477-10,10s4.478,10,10,10h211c5.523,0,10-4.477,10-10S280.522,310,275,310z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M282.069,368.93C280.21,367.07,277.63,366,275,366s-5.21,1.07-7.07,2.93c-1.861,1.86-2.93,4.44-2.93,7.07    s1.07,5.21,2.93,7.07c1.86,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.069-2.93c1.861-1.86,2.931-4.43,2.931-7.07    C285,373.37,283.929,370.79,282.069,368.93z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M235.667,366H64c-5.522,0-10,4.477-10,10s4.478,10,10,10h171.667c5.523,0,10-4.477,10-10S241.189,366,235.667,366z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M210,254H64c-5.522,0-10,4.477-10,10s4.478,10,10,10h146c5.523,0,10-4.477,10-10S215.522,254,210,254z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Questions</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/battles")}>
						<Link to="/battles">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 511.999 511.999"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M466.45,49.374c-7.065-8.308-17.368-13.071-28.267-13.071H402.41v-11.19C402.41,11.266,391.143,0,377.297,0H134.705    c-13.848,0-25.112,11.266-25.112,25.112v11.19H73.816c-10.899,0-21.203,4.764-28.267,13.071    c-6.992,8.221-10.014,19.019-8.289,29.624c9.4,57.8,45.775,108.863,97.4,136.872c4.717,11.341,10.059,22.083,16.008,32.091    c19.002,31.975,42.625,54.073,68.627,64.76c2.635,26.644-15.094,51.885-41.794,57.9c-0.057,0.013-0.097,0.033-0.153,0.046    c-5.211,1.245-9.09,5.921-9.09,11.513v54.363h-21.986c-19.602,0-35.549,15.947-35.549,35.549v28.058    c0,6.545,5.305,11.85,11.85,11.85H390.56c6.545,0,11.85-5.305,11.85-11.85v-28.058c0-19.602-15.947-35.549-35.549-35.549h-21.988    V382.18c0-5.603-3.893-10.286-9.118-11.52c-0.049-0.012-0.096-0.028-0.145-0.04c-26.902-6.055-44.664-31.55-41.752-58.394    c25.548-10.86,48.757-32.761,67.479-64.264c5.949-10.009,11.29-20.752,16.008-32.095c51.622-28.01,87.995-79.072,97.395-136.87    C476.465,68.392,473.443,57.595,466.45,49.374z M60.652,75.192c-0.616-3.787,0.431-7.504,2.949-10.466    c2.555-3.004,6.277-4.726,10.214-4.726h35.777v21.802c0,34.186,4.363,67.3,12.632,97.583    C89.728,153.706,67.354,116.403,60.652,75.192z M366.861,460.243c6.534,0,11.85,5.316,11.85,11.85v16.208H134.422v-16.208    c0-6.534,5.316-11.85,11.85-11.85H366.861z M321.173,394.03v42.513H191.96V394.03H321.173z M223.037,370.331    c2.929-3.224,5.607-6.719,8.002-10.46c7.897-12.339,12.042-26.357,12.228-40.674c4.209,0.573,8.457,0.88,12.741,0.88    c4.661,0,9.279-0.358,13.852-1.036c0.27,19.239,7.758,37.45,20.349,51.289H223.037z M378.709,81.803    c0,58.379-13.406,113.089-37.747,154.049c-23.192,39.03-53.364,60.525-84.956,60.525c-31.597,0-61.771-21.494-84.966-60.523    c-24.342-40.961-37.748-95.671-37.748-154.049V25.112c0-0.78,0.634-1.413,1.412-1.413h242.591c0.78,0,1.414,0.634,1.414,1.413    V81.803z M451.348,75.192c-6.702,41.208-29.074,78.51-61.569,104.191c8.268-30.283,12.631-63.395,12.631-97.58V60.001h35.773    c3.938,0,7.66,1.723,10.214,4.726C450.915,67.688,451.963,71.405,451.348,75.192z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M327.941,121.658c-1.395-4.288-5.103-7.414-9.566-8.064l-35.758-5.196l-15.991-32.402    c-1.997-4.044-6.116-6.605-10.626-6.605c-4.511,0-8.63,2.561-10.626,6.605l-15.991,32.402l-35.758,5.196    c-4.464,0.648-8.172,3.775-9.566,8.065c-1.393,4.291-0.231,8.999,2.999,12.148l25.875,25.221l-6.109,35.613    c-0.763,4.446,1.064,8.938,4.714,11.59c3.648,2.651,8.487,3,12.479,0.902L256,190.32l31.982,16.813    c1.734,0.911,3.627,1.36,5.512,1.36c2.456,0,4.902-0.763,6.966-2.263c3.65-2.652,5.477-7.144,4.714-11.59l-6.109-35.613    l25.875-25.221C328.172,130.658,329.334,125.949,327.941,121.658z M278.064,146.405c-2.793,2.722-4.068,6.644-3.408,10.489    l3.102,18.09l-16.245-8.541c-1.725-0.908-3.62-1.36-5.514-1.36c-1.894,0-3.788,0.454-5.514,1.36l-16.245,8.541l3.102-18.09    c0.66-3.844-0.615-7.766-3.408-10.489l-13.141-12.81l18.162-2.64c3.859-0.56,7.196-2.985,8.922-6.482l8.123-16.458l8.122,16.458    c1.727,3.497,5.062,5.921,8.922,6.482l18.162,2.64L278.064,146.405z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>League and Battles</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/shop")}>
						<Link to="/shop">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 511.999 511.999"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M214.685,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029    C259.713,423.028,239.513,402.828,214.685,402.828z M214.685,467.742c-10.966,0-19.887-8.922-19.887-19.887    c0-10.966,8.922-19.887,19.887-19.887s19.887,8.922,19.887,19.887C234.572,458.822,225.65,467.742,214.685,467.742z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M372.63,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029    C417.658,423.028,397.458,402.828,372.63,402.828z M372.63,467.742c-10.966,0-19.887-8.922-19.887-19.887    c0-10.966,8.922-19.887,19.887-19.887c10.966,0,19.887,8.922,19.887,19.887C392.517,458.822,383.595,467.742,372.63,467.742z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M383.716,165.755H203.567c-6.943,0-12.571,5.628-12.571,12.571c0,6.943,5.629,12.571,12.571,12.571h180.149    c6.943,0,12.571-5.628,12.571-12.571C396.287,171.382,390.659,165.755,383.716,165.755z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M373.911,231.035H213.373c-6.943,0-12.571,5.628-12.571,12.571s5.628,12.571,12.571,12.571h160.537    c6.943,0,12.571-5.628,12.571-12.571C386.481,236.664,380.853,231.035,373.911,231.035z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M506.341,109.744c-4.794-5.884-11.898-9.258-19.489-9.258H95.278L87.37,62.097c-1.651-8.008-7.113-14.732-14.614-17.989    l-55.177-23.95c-6.37-2.767-13.773,0.156-16.536,6.524c-2.766,6.37,0.157,13.774,6.524,16.537L62.745,67.17l60.826,295.261    c2.396,11.628,12.752,20.068,24.625,20.068h301.166c6.943,0,12.571-5.628,12.571-12.571c0-6.943-5.628-12.571-12.571-12.571    H148.197l-7.399-35.916H451.69c11.872,0,22.229-8.44,24.624-20.068l35.163-170.675    C513.008,123.266,511.136,115.627,506.341,109.744z M451.69,296.301H135.619l-35.161-170.674l386.393,0.001L451.69,296.301z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Shop Items</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/announcements")}>
						<Link to="/">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512 512"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M449.511,137.648v-82.38c0-9.072-4.668-17.227-12.487-21.814c-7.849-4.605-17.29-4.7-25.251-0.247    c-76.024,42.516-158.725,67.345-245.805,73.802c-0.667,0.049-79.372,0.393-79.372,0.393c-19.767,0-36.105,14.923-38.366,34.091    H32.075C14.39,141.493,0,155.881,0,173.567v70.468c0,17.686,14.39,32.075,32.075,32.075h16.153    c1.628,13.795,10.544,25.383,22.785,30.799l57.485,158.648c3.593,9.875,13.067,16.511,23.578,16.511h57.687    c8.178,0,15.86-3.999,20.551-10.697c4.691-6.7,5.822-15.287,3.03-22.96l-49.389-136.237    c80.482,8.361,157.039,32.601,227.817,72.183c3.905,2.184,8.166,3.273,12.42,3.273c4.417-0.001,8.83-1.175,12.829-3.521    c7.819-4.588,12.489-12.742,12.489-21.816v-82.38C484.711,275.353,512,245.204,512,208.781    C512,172.357,484.711,142.207,449.511,137.648z M47.951,251.372H32.075c-4.047,0-7.338-3.291-7.338-7.338v-70.467    c0-4.044,3.291-7.337,7.338-7.337h15.876V251.372z M80.93,284.245c-4.85-2.174-8.242-7.039-8.242-12.688V146.044h0.001    c0-7.667,6.239-13.905,13.906-13.905h67.333v153.324c0,0-67.92-0.026-68.213-0.044C83.234,285.132,82.712,285.004,80.93,284.245z     M210.091,456.853c0.04,0.101,0.066,0.173-0.041,0.324c-0.105,0.151-0.183,0.151-0.288,0.151h-57.687    c-0.147,0-0.282-0.093-0.327-0.215L98.515,310.199h58.411L210.091,456.853z M424.774,362.294c0,0.179,0,0.322-0.267,0.479    c-0.318,0.184-0.508,0.079-0.66-0.006c-76.034-42.52-158.469-68.045-245.182-75.96v-156.04    c86.72-7.927,169.155-33.454,245.179-75.97c0.156-0.085,0.349-0.19,0.663-0.006c0.267,0.157,0.267,0.298,0.267,0.477V362.294z     M449.511,254.873v-92.185c21.503,4.314,37.752,23.339,37.752,46.092C487.263,231.534,471.013,250.56,449.511,254.873z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Announcements</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/logs")}>
						<Link to="/">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 512 512"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M312.461,332.734H199.539c-8.511,0-15.434,6.923-15.434,15.434v34.634c0,8.511,6.923,15.435,15.434,15.435h112.923    c8.511,0,15.435-6.923,15.435-15.435v-34.634C327.895,339.658,320.972,332.734,312.461,332.734z M308.051,378.393H203.948v-25.814    h104.103V378.393z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M506.976,246.958l0.159-0.08L432.73,99.774c-6.015-11.89-18.025-19.275-31.346-19.275h-14.141V66.824    c0-5.48-4.442-9.922-9.922-9.922H134.68c-5.48,0-9.922,4.442-9.922,9.922v13.675h-14.141c-13.321,0-25.331,7.385-31.346,19.275    L4.865,246.878l0.159,0.08C1.837,252.207,0,258.363,0,264.939v155.409c0,19.162,15.59,34.751,34.752,34.751h442.497    c19.162,0,34.751-15.59,34.751-34.751V264.939C512,258.363,510.163,252.207,506.976,246.958z M387.242,102.548h14.141    c4.959,0,9.43,2.751,11.671,7.179l60.93,120.462h-41.431v-37.066c0-5.48-4.442-9.922-9.922-9.922h-12.275v-53.227    c0-5.48-4.442-9.922-9.922-9.922h-13.192V102.548z M412.71,203.044v27.144h-52.359c-8.984,0-17.174,5.293-20.865,13.482    l-14.296,31.71c-0.136,0.299-0.435,0.493-0.764,0.493H187.575c-0.329,0-0.628-0.194-0.764-0.494l-14.295-31.708    c-3.692-8.19-11.882-13.483-20.866-13.483H99.291v-27.144H412.71z M144.602,76.746h222.796v43.305H144.602V76.746z     M390.512,139.895v43.305H121.488v-43.305H390.512z M98.946,109.727c2.24-4.429,6.712-7.179,11.671-7.179h14.141v17.503h-13.192    c-5.48,0-9.922,4.442-9.922,9.922v53.227H89.369c-5.48,0-9.922,4.442-9.922,9.922v37.066H38.016L98.946,109.727z M477.249,433.049    H34.752c-7.004,0-12.703-5.699-12.703-12.701V264.939c0-7.003,5.698-12.701,12.703-12.701H151.65c0.328,0,0.629,0.194,0.765,0.495    l14.295,31.708c3.692,8.19,11.881,13.481,20.865,13.481h136.85c8.984,0,17.174-5.292,20.865-13.48l14.296-31.709v-0.001    c0.136-0.3,0.435-0.494,0.764-0.494h116.898c7.004,0,12.701,5.699,12.701,12.701v155.409h0.001    C489.951,427.352,484.253,433.049,477.249,433.049z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Logs</span>
						</Link>
					</li>
					<li className={this.getActiveLink("/settings")}>
						<Link to="/">
							<svg
								version="1.1"
								x="0px"
								y="0px"
								viewBox="0 0 511.999 511.999"
								width="25px"
								height="25px"
							>
								<g>
									<g>
										<path
											d="M489.175,206.556c-9.629-1.442-19.514-2.825-29.379-4.111c-1.195-0.155-2.165-0.966-2.467-2.064    c-4.553-16.523-11.16-32.467-19.636-47.389c-0.57-1.002-0.463-2.266,0.273-3.223c6.067-7.885,12.081-15.856,17.876-23.69    c7.824-10.578,6.688-25.588-2.64-34.917l-32.366-32.366c-9.329-9.328-24.338-10.464-34.918-2.638    c-7.817,5.782-15.787,11.796-23.689,17.875c-0.954,0.736-2.221,0.843-3.223,0.274c-14.921-8.476-30.865-15.083-47.389-19.637    c-1.099-0.301-1.91-1.271-2.066-2.469c-1.289-9.88-2.671-19.764-4.109-29.376C303.495,9.812,292.079,0,278.886,0h-45.773    c-13.194,0-24.61,9.812-26.554,22.824c-1.439,9.614-2.821,19.497-4.11,29.379c-0.157,1.197-0.967,2.165-2.067,2.467    c-16.524,4.556-32.469,11.162-47.387,19.637c-1.003,0.569-2.269,0.459-3.225-0.274c-7.901-6.079-15.872-12.093-23.69-17.876    c-10.581-7.825-25.59-6.687-34.917,2.64L58.797,91.163c-9.329,9.33-10.464,24.341-2.638,34.918    c5.804,7.846,11.818,15.815,17.875,23.688c0.735,0.955,0.843,2.22,0.274,3.223c-8.478,14.925-15.084,30.869-19.637,47.389    c-0.301,1.097-1.271,1.908-2.467,2.065c-9.86,1.287-19.744,2.669-29.378,4.111C9.812,208.502,0,219.92,0,233.112v45.774    c0,13.193,9.812,24.61,22.824,26.556c9.634,1.442,19.519,2.824,29.379,4.11c1.197,0.157,2.165,0.967,2.467,2.066    c4.553,16.521,11.16,32.465,19.637,47.389c0.569,1.003,0.461,2.268-0.274,3.223c-6.072,7.892-12.086,15.862-17.875,23.689    c-7.825,10.578-6.691,25.589,2.638,34.918l32.366,32.366c9.33,9.329,24.341,10.465,34.918,2.638    c7.817-5.782,15.787-11.796,23.689-17.875c0.955-0.736,2.221-0.842,3.223-0.274c14.92,8.476,30.863,15.081,47.389,19.637    c1.099,0.302,1.91,1.271,2.066,2.467c1.289,9.88,2.672,19.765,4.11,29.376c1.946,13.013,13.362,22.825,26.556,22.825h45.773    c13.193,0,24.61-9.812,26.555-22.827c1.439-9.623,2.821-19.507,4.109-29.376c0.157-1.197,0.967-2.166,2.066-2.469    c16.524-4.556,32.469-11.162,47.388-19.637c1.003-0.567,2.268-0.459,3.224,0.274c7.901,6.079,15.872,12.093,23.689,17.875    c10.578,7.825,25.588,6.691,34.918-2.638l32.366-32.366c9.328-9.329,10.464-24.339,2.639-34.918    c-5.795-7.831-11.81-15.802-17.876-23.689c-0.735-0.955-0.843-2.22-0.273-3.223c8.477-14.924,15.083-30.868,19.636-47.388    c0.304-1.1,1.272-1.91,2.469-2.067c9.863-1.286,19.748-2.669,29.378-4.11c13.013-1.945,22.825-13.362,22.825-26.555v-45.774    C511.999,219.919,502.187,208.501,489.175,206.556z M488.091,278.888c0,1.45-1.054,2.7-2.453,2.911    c-9.482,1.419-19.216,2.779-28.932,4.048c-10.758,1.402-19.56,9.024-22.426,19.42c-4.029,14.618-9.875,28.727-17.375,41.932    c-5.333,9.389-4.504,21.012,2.112,29.612c5.976,7.768,11.899,15.617,17.604,23.329c0.842,1.137,0.702,2.769-0.323,3.794    l-32.367,32.366c-1.026,1.026-2.657,1.163-3.793,0.324c-7.697-5.695-15.548-11.618-23.33-17.605    c-8.599-6.617-20.221-7.446-29.609-2.114c-13.205,7.5-27.314,13.347-41.934,17.377c-10.394,2.865-18.016,11.667-19.421,22.426    c-1.267,9.722-2.629,19.456-4.047,28.932c-0.209,1.399-1.461,2.453-2.911,2.453h-45.773c-1.45,0-2.702-1.054-2.911-2.454    c-1.415-9.465-2.778-19.199-4.047-28.93c-1.403-10.759-9.027-19.561-19.421-22.426c-14.621-4.03-28.73-9.877-41.934-17.378    c-4.117-2.337-8.664-3.491-13.196-3.491c-5.804,0-11.585,1.89-16.412,5.607c-7.783,5.987-15.633,11.91-23.33,17.605    c-1.138,0.839-2.767,0.702-3.792-0.324l-32.367-32.366c-1.026-1.026-1.166-2.656-0.324-3.793    c5.701-7.707,11.623-15.556,17.604-23.33c6.615-8.6,7.445-20.221,2.114-29.609c-7.503-13.209-13.348-27.317-17.377-41.934    c-2.865-10.394-11.667-18.017-22.425-19.42c-9.712-1.267-19.447-2.63-28.934-4.048c-1.399-0.21-2.453-1.461-2.453-2.911v-45.774    c0-1.45,1.054-2.701,2.453-2.911c9.487-1.419,19.221-2.781,28.932-4.048c10.759-1.402,19.561-9.025,22.426-19.42    c4.027-14.616,9.874-28.725,17.377-41.934c5.332-9.389,4.502-21.011-2.113-29.609c-5.965-7.756-11.888-15.604-17.604-23.33    c-0.84-1.137-0.701-2.769,0.324-3.793l32.365-32.367c1.024-1.026,2.655-1.163,3.792-0.324c7.697,5.694,15.547,11.617,23.33,17.605    c8.6,6.614,20.221,7.445,29.611,2.112c13.203-7.5,27.312-13.347,41.932-17.377c10.395-2.865,18.019-11.667,19.422-22.426    c1.27-9.731,2.631-19.465,4.048-28.933c0.209-1.397,1.461-2.452,2.911-2.452h45.773c1.45,0,2.702,1.054,2.911,2.453    c1.417,9.465,2.778,19.198,4.048,28.932c1.403,10.759,9.027,19.561,19.421,22.426c14.62,4.03,28.728,9.877,41.934,17.377    c9.388,5.33,21.01,4.502,29.608-2.114c7.783-5.987,15.633-11.91,23.329-17.604c1.137-0.842,2.769-0.703,3.794,0.324l32.366,32.366    c1.026,1.026,1.164,2.657,0.324,3.793c-5.705,7.714-11.628,15.562-17.604,23.33c-6.615,8.601-7.445,20.223-2.112,29.612    c7.501,13.205,13.347,27.313,17.377,41.933c2.865,10.394,11.669,18.016,22.424,19.418c9.716,1.268,19.451,2.63,28.934,4.048    c1.399,0.21,2.453,1.461,2.453,2.911V278.888z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
								<g>
									<g>
										<path
											d="M256,144.866c-61.28,0-111.134,49.854-111.134,111.134S194.72,367.134,256,367.134S367.134,317.28,367.134,256    S317.28,144.866,256,144.866z M256,343.225c-48.097,0-87.225-39.129-87.225-87.225c0-48.097,39.13-87.225,87.225-87.225    c48.096,0,87.225,39.129,87.225,87.225S304.097,343.225,256,343.225z"
											fill="#9c9c9c"
										/>
									</g>
								</g>
							</svg>
							<span>Settings</span>
						</Link>
					</li>
				</ul>
			</Menu>
		);
	}
}

const Menu = styled.div`
	position: fixed;
	top: 60px;
	left: 0;
	bottom: 0;
	width: 120px;
	background-color: rgba(243, 243, 243, 0.38);
	z-index: 10;
	box-shadow: 0 1px 15px 1px rgba(52, 40, 104, 0.08);
	transform: ${props => (props.active ? "translateX(0)" : "translateX(-100%)")};
	transition: transform 0.5s ease;
	ul {
		list-style: none;
		padding: 0;
		margin: 20px 0 0 0;
		position: relative;
		z-index: 15;
	}
	li {
		display: flex;
	}
	li a {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #000;
		flex: 1 1 100%;
		cursor: pointer;
		margin: 7px;
		border-radius: 10px;
		transition: all 0.3s ease;
	}
	li a svg {
		margin-bottom: 10px;
	}
	li a svg path {
		fill: #cacaca;
	}
	li a:hover svg path,
	li.active a svg path {
		fill: #e30917;
		transition: all 0.3s ease;
	}
	li a span {
		text-align: center;
		opacity: 0;
		visibility: hidden;
		transform: translate(0, -10px);
		transition: all 0.3s ease;
	}
	li.active a span,
	li a:hover span {
		opacity: 1;
		visibility: visible;
		transform: translate(0, 0);
		transition: all 0.3s ease;
	}
`;
