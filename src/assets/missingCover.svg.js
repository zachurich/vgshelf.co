import random from "lodash/random";
import React, { useState, useEffect } from "react";
import { getColor, documentExists } from "../common/utils";
import { siteColors } from "../common/constants";
import { useRandomColor } from "../common/hooks";

function MissingCover() {
  const color = useRandomColor();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="386"
      height="501"
      fill="none"
      viewBox="0 0 386 501"
    >
      <path fill="#292929" stroke="#fff" d="M0.5 0.5H384.5V499.5H0.5z"></path>
      <path
        fill={color}
        d="M0 395.394c26.91-47.381 52.097-101.412 197.5-142.143 80.886-22.659 183.142-42.033 188.297-233.858.057-7.213.124-12.453.203-15.393 0 5.251-.068 10.381-.203 15.393-.574 72.361-.126 343.246.203 481.607H0V395.394z"
      ></path>
      <path
        fill="#fff"
        d="M84.784 138.56c1.621 0 2.944.533 3.968 1.6 1.067 1.067 1.6 2.453 1.6 4.16v34.24c0 1.749-.512 3.157-1.536 4.224-1.024 1.067-2.347 1.6-3.968 1.6-1.92 0-3.37-.64-4.352-1.92L61.04 158.208v20.352c0 1.749-.49 3.157-1.472 4.224-.981 1.067-2.304 1.6-3.968 1.6-1.621 0-2.944-.533-3.968-1.6-1.024-1.067-1.536-2.475-1.536-4.224v-34.24c0-1.707.512-3.093 1.536-4.16 1.024-1.067 2.347-1.6 3.968-1.6 1.835 0 3.264.64 4.288 1.92l19.456 24.192V144.32c0-1.749.49-3.136 1.472-4.16 1.024-1.067 2.347-1.6 3.968-1.6zm28.854 45.952c-3.456 0-6.507-.661-9.152-1.984-2.603-1.365-4.63-3.285-6.08-5.76-1.409-2.475-2.113-5.376-2.113-8.704 0-3.328.704-6.208 2.112-8.64 1.451-2.475 3.478-4.373 6.081-5.696 2.602-1.323 5.653-1.984 9.152-1.984 3.498 0 6.549.661 9.152 1.984 2.602 1.323 4.608 3.221 6.016 5.696 1.45 2.432 2.176 5.312 2.176 8.64 0 3.328-.726 6.229-2.176 8.704-1.408 2.475-3.414 4.395-6.016 5.76-2.603 1.323-5.654 1.984-9.152 1.984zm0-8.512c4.053 0 6.08-2.645 6.08-7.936s-2.027-7.936-6.08-7.936c-4.054 0-6.08 2.645-6.08 7.936s2.026 7.936 6.08 7.936zm-49.142 95.512c-5.12 0-9.173-1.451-12.16-4.352-2.987-2.901-4.48-6.848-4.48-11.84 0-3.285.725-6.187 2.176-8.704 1.45-2.517 3.477-4.459 6.08-5.824 2.645-1.365 5.653-2.048 9.024-2.048 1.792 0 3.584.235 5.376.704 1.792.469 3.37 1.131 4.736 1.984 1.323.811 1.984 2.048 1.984 3.712 0 1.323-.32 2.411-.96 3.264-.597.811-1.387 1.216-2.368 1.216a6.71 6.71 0 01-1.856-.256 15.269 15.269 0 01-1.984-.896c-.853-.384-1.579-.661-2.176-.832a5.873 5.873 0 00-1.984-.32c-4.224 0-6.336 2.581-6.336 7.744 0 2.56.533 4.523 1.6 5.888 1.11 1.323 2.688 1.984 4.736 1.984.725 0 1.387-.085 1.984-.256.64-.213 1.344-.512 2.112-.896.853-.384 1.536-.661 2.048-.832a4.957 4.957 0 011.792-.32c.981 0 1.77.427 2.368 1.28.64.811.96 1.877.96 3.2 0 .811-.17 1.557-.512 2.24a3.604 3.604 0 01-1.408 1.472c-2.944 1.792-6.528 2.688-10.752 2.688zm32.704 0c-3.456 0-6.507-.661-9.152-1.984-2.603-1.365-4.63-3.285-6.08-5.76-1.408-2.475-2.112-5.376-2.112-8.704 0-3.328.704-6.208 2.112-8.64 1.45-2.475 3.477-4.373 6.08-5.696 2.603-1.323 5.653-1.984 9.152-1.984 3.499 0 6.549.661 9.152 1.984 2.603 1.323 4.608 3.221 6.016 5.696 1.451 2.432 2.176 5.312 2.176 8.64 0 3.328-.725 6.229-2.176 8.704-1.408 2.475-3.413 4.395-6.016 5.76-2.603 1.323-5.653 1.984-9.152 1.984zm0-8.512c4.053 0 6.08-2.645 6.08-7.936s-2.027-7.936-6.08-7.936-6.08 2.645-6.08 7.936S93.147 263 97.2 263zm42.872-20.928c.469-1.067 1.109-1.856 1.92-2.368a5.254 5.254 0 012.752-.768c1.408 0 2.645.469 3.712 1.408 1.109.939 1.664 2.069 1.664 3.392 0 .725-.171 1.429-.512 2.112l-11.2 22.272a5.78 5.78 0 01-2.24 2.496c-.939.555-1.984.832-3.136.832a6.39 6.39 0 01-3.2-.832c-.982-.597-1.728-1.429-2.24-2.496l-11.2-22.272c-.342-.768-.512-1.451-.512-2.048 0-1.365.576-2.517 1.728-3.456 1.194-.981 2.56-1.472 4.096-1.472a5.06 5.06 0 012.816.832c.896.512 1.578 1.301 2.048 2.368l6.784 14.656 6.72-14.656zm38.481 18.816c.981 0 1.771.384 2.368 1.152.64.768.96 1.771.96 3.008 0 1.707-.832 3.008-2.496 3.904-1.451.725-3.179 1.344-5.184 1.856-1.963.469-3.776.704-5.44.704-3.499 0-6.549-.661-9.152-1.984-2.603-1.323-4.608-3.221-6.016-5.696-1.408-2.475-2.112-5.376-2.112-8.704 0-3.157.661-5.973 1.984-8.448 1.365-2.517 3.243-4.459 5.632-5.824 2.432-1.408 5.163-2.112 8.192-2.112 2.944 0 5.525.64 7.744 1.92 2.219 1.28 3.925 3.093 5.12 5.44 1.237 2.347 1.856 5.099 1.856 8.256 0 .981-.235 1.749-.704 2.304-.427.512-1.067.768-1.92.768h-16.896c.299 2.048.96 3.52 1.984 4.416 1.024.896 2.539 1.344 4.544 1.344 1.067 0 2.048-.107 2.944-.32a35.983 35.983 0 003.008-1.024c.64-.256 1.259-.469 1.856-.64.64-.213 1.216-.32 1.728-.32zm-10.944-14.464c-1.493 0-2.688.491-3.584 1.472-.896.939-1.429 2.325-1.6 4.16h10.048c-.256-3.755-1.877-5.632-4.864-5.632zm39.562-7.552c1.451-.128 2.603.213 3.456 1.024.853.768 1.28 1.92 1.28 3.456 0 1.707-.405 2.944-1.216 3.712-.768.768-2.176 1.259-4.224 1.472l-1.92.192c-2.133.256-3.669.939-4.608 2.048-.896 1.067-1.344 2.539-1.344 4.416v10.944c0 1.749-.555 3.072-1.664 3.968-1.067.853-2.411 1.28-4.032 1.28s-2.987-.427-4.096-1.28c-1.067-.896-1.6-2.219-1.6-3.968v-22.144c0-1.621.533-2.88 1.6-3.776 1.109-.896 2.432-1.344 3.968-1.344 1.579 0 2.837.427 3.776 1.28.981.853 1.472 2.048 1.472 3.584v1.216c.683-1.877 1.792-3.328 3.328-4.352 1.579-1.024 3.221-1.579 4.928-1.664l.896-.064zm39.813-.128c4.864 0 8.448 1.173 10.752 3.52 2.347 2.304 3.52 5.824 3.52 10.56V266.2c0 1.621-.491 2.901-1.472 3.84-.939.896-2.261 1.344-3.968 1.344-1.493 0-2.731-.427-3.712-1.28-.939-.853-1.451-2.005-1.536-3.456a7.082 7.082 0 01-3.008 3.584c-1.408.853-3.093 1.28-5.056 1.28-2.176 0-4.139-.427-5.888-1.28-1.749-.896-3.136-2.112-4.16-3.648-.981-1.579-1.472-3.349-1.472-5.312 0-2.261.576-4.053 1.728-5.376 1.195-1.365 3.072-2.347 5.632-2.944 2.56-.597 6.016-.896 10.368-.896h1.728v-.768c0-1.493-.341-2.56-1.024-3.2-.683-.683-1.835-1.024-3.456-1.024-1.749 0-4.309.597-7.68 1.792-.981.341-1.813.512-2.496.512-1.067 0-1.92-.384-2.56-1.152-.64-.768-.96-1.771-.96-3.008 0-.939.192-1.707.576-2.304.384-.597 1.003-1.131 1.856-1.6 1.493-.768 3.371-1.387 5.632-1.856a32.721 32.721 0 016.656-.704zm-1.792 25.152c1.536 0 2.795-.533 3.776-1.6.981-1.109 1.472-2.517 1.472-4.224v-.768h-1.024c-2.731 0-4.672.256-5.824.768-1.152.469-1.728 1.28-1.728 2.432 0 .981.299 1.792.896 2.432.64.64 1.451.96 2.432.96zm42.417-25.024c1.45-.128 2.602.213 3.456 1.024.853.768 1.28 1.92 1.28 3.456 0 1.707-.406 2.944-1.216 3.712-.768.768-2.176 1.259-4.224 1.472l-1.92.192c-2.134.256-3.67.939-4.608 2.048-.896 1.067-1.344 2.539-1.344 4.416v10.944c0 1.749-.555 3.072-1.664 3.968-1.067.853-2.411 1.28-4.032 1.28-1.622 0-2.987-.427-4.096-1.28-1.067-.896-1.6-2.219-1.6-3.968v-22.144c0-1.621.533-2.88 1.6-3.776 1.109-.896 2.432-1.344 3.968-1.344 1.578 0 2.837.427 3.776 1.28.981.853 1.472 2.048 1.472 3.584v1.216c.682-1.877 1.792-3.328 3.328-4.352 1.578-1.024 3.221-1.579 4.928-1.664l.896-.064zm28.843 24.384c2.859.171 4.288 1.451 4.288 3.84 0 1.493-.576 2.603-1.728 3.328-1.152.725-2.795 1.024-4.928.896l-1.792-.128c-3.84-.299-6.763-1.451-8.768-3.456-1.963-2.048-2.944-4.885-2.944-8.512v-11.328h-1.856c-3.413 0-5.12-1.408-5.12-4.224 0-2.773 1.707-4.16 5.12-4.16h1.856v-4.16c0-1.621.512-2.901 1.536-3.84 1.024-.981 2.411-1.472 4.16-1.472s3.136.491 4.16 1.472c1.024.939 1.536 2.219 1.536 3.84v4.16h3.52c3.413 0 5.12 1.387 5.12 4.16 0 2.816-1.707 4.224-5.12 4.224h-3.52v12.288c0 .811.235 1.493.704 2.048.512.555 1.152.853 1.92.896l1.856.128zM63.984 325.744c4.864 0 8.448 1.173 10.752 3.52 2.347 2.304 3.52 5.824 3.52 10.56V353.2c0 1.621-.49 2.901-1.472 3.84-.939.896-2.261 1.344-3.968 1.344-1.493 0-2.73-.427-3.712-1.28-.939-.853-1.45-2.005-1.536-3.456a7.083 7.083 0 01-3.008 3.584c-1.408.853-3.093 1.28-5.056 1.28-2.176 0-4.139-.427-5.888-1.28-1.75-.896-3.136-2.112-4.16-3.648-.981-1.579-1.472-3.349-1.472-5.312 0-2.261.576-4.053 1.728-5.376 1.195-1.365 3.072-2.347 5.632-2.944 2.56-.597 6.016-.896 10.368-.896h1.728v-.768c0-1.493-.341-2.56-1.024-3.2-.683-.683-1.835-1.024-3.456-1.024-1.75 0-4.31.597-7.68 1.792-.981.341-1.813.512-2.496.512-1.067 0-1.92-.384-2.56-1.152-.64-.768-.96-1.771-.96-3.008 0-.939.192-1.707.576-2.304.384-.597 1.003-1.131 1.856-1.6 1.493-.768 3.37-1.387 5.632-1.856a32.723 32.723 0 016.656-.704zm-1.792 25.152c1.536 0 2.795-.533 3.776-1.6.981-1.109 1.472-2.517 1.472-4.224v-.768h-1.024c-2.73 0-4.672.256-5.824.768-1.152.469-1.728 1.28-1.728 2.432 0 .981.299 1.792.896 2.432.64.64 1.45.96 2.432.96zm43.505-21.824c.469-1.067 1.109-1.856 1.92-2.368a5.254 5.254 0 012.752-.768c1.408 0 2.645.469 3.712 1.408 1.109.939 1.664 2.069 1.664 3.392 0 .725-.171 1.429-.512 2.112l-11.2 22.272a5.78 5.78 0 01-2.24 2.496c-.939.555-1.985.832-3.137.832a6.39 6.39 0 01-3.2-.832 5.777 5.777 0 01-2.24-2.496l-11.2-22.272c-.34-.768-.512-1.451-.512-2.048 0-1.365.576-2.517 1.728-3.456 1.195-.981 2.56-1.472 4.097-1.472 1.024 0 1.962.277 2.816.832.895.512 1.578 1.301 2.047 2.368l6.785 14.656 6.72-14.656zm27.975-3.328c4.864 0 8.448 1.173 10.752 3.52 2.346 2.304 3.52 5.824 3.52 10.56V353.2c0 1.621-.491 2.901-1.472 3.84-.939.896-2.262 1.344-3.968 1.344-1.494 0-2.731-.427-3.712-1.28-.939-.853-1.451-2.005-1.536-3.456a7.086 7.086 0 01-3.008 3.584c-1.408.853-3.094 1.28-5.056 1.28-2.176 0-4.139-.427-5.888-1.28-1.75-.896-3.136-2.112-4.16-3.648-.982-1.579-1.472-3.349-1.472-5.312 0-2.261.576-4.053 1.728-5.376 1.194-1.365 3.072-2.347 5.632-2.944 2.56-.597 6.016-.896 10.368-.896h1.728v-.768c0-1.493-.342-2.56-1.024-3.2-.683-.683-1.835-1.024-3.456-1.024-1.75 0-4.31.597-7.68 1.792-.982.341-1.814.512-2.496.512-1.067 0-1.92-.384-2.561-1.152-.639-.768-.959-1.771-.959-3.008 0-.939.192-1.707.576-2.304.384-.597 1.002-1.131 1.856-1.6 1.493-.768 3.37-1.387 5.632-1.856a32.721 32.721 0 016.656-.704zm-1.792 25.152c1.536 0 2.794-.533 3.776-1.6.981-1.109 1.472-2.517 1.472-4.224v-.768h-1.024c-2.731 0-4.672.256-5.824.768-1.152.469-1.728 1.28-1.728 2.432 0 .981.298 1.792.896 2.432.64.64 1.45.96 2.432.96zm28.144 7.488c-1.621 0-2.987-.427-4.096-1.28-1.067-.896-1.6-2.219-1.6-3.968V331.12c0-1.749.533-3.051 1.6-3.904 1.109-.896 2.475-1.344 4.096-1.344s2.965.448 4.032 1.344c1.109.853 1.664 2.155 1.664 3.904v22.016c0 1.749-.555 3.072-1.664 3.968-1.067.853-2.411 1.28-4.032 1.28zm0-36.992c-1.92 0-3.456-.491-4.608-1.472-1.109-1.024-1.664-2.368-1.664-4.032 0-1.664.555-2.987 1.664-3.968 1.152-.981 2.688-1.472 4.608-1.472 1.877 0 3.392.491 4.544 1.472 1.152.981 1.728 2.304 1.728 3.968 0 1.664-.576 3.008-1.728 4.032-1.109.981-2.624 1.472-4.544 1.472zm18 36.992c-1.621 0-2.987-.427-4.096-1.28-1.067-.896-1.6-2.219-1.6-3.968v-35.264c0-1.749.533-3.072 1.6-3.968 1.109-.896 2.475-1.344 4.096-1.344s2.965.448 4.032 1.344c1.109.896 1.664 2.219 1.664 3.968v35.264c0 1.749-.555 3.072-1.664 3.968-1.067.853-2.411 1.28-4.032 1.28zm26.96-32.64c4.864 0 8.448 1.173 10.752 3.52 2.347 2.304 3.52 5.824 3.52 10.56V353.2c0 1.621-.491 2.901-1.472 3.84-.939.896-2.261 1.344-3.968 1.344-1.493 0-2.731-.427-3.712-1.28-.939-.853-1.451-2.005-1.536-3.456a7.082 7.082 0 01-3.008 3.584c-1.408.853-3.093 1.28-5.056 1.28-2.176 0-4.139-.427-5.888-1.28-1.749-.896-3.136-2.112-4.16-3.648-.981-1.579-1.472-3.349-1.472-5.312 0-2.261.576-4.053 1.728-5.376 1.195-1.365 3.072-2.347 5.632-2.944 2.56-.597 6.016-.896 10.368-.896h1.728v-.768c0-1.493-.341-2.56-1.024-3.2-.683-.683-1.835-1.024-3.456-1.024-1.749 0-4.309.597-7.68 1.792-.981.341-1.813.512-2.496.512-1.067 0-1.92-.384-2.56-1.152-.64-.768-.96-1.771-.96-3.008 0-.939.192-1.707.576-2.304.384-.597 1.003-1.131 1.856-1.6 1.493-.768 3.371-1.387 5.632-1.856a32.721 32.721 0 016.656-.704zm-1.792 25.152c1.536 0 2.795-.533 3.776-1.6.981-1.109 1.472-2.517 1.472-4.224v-.768h-1.024c-2.731 0-4.672.256-5.824.768-1.152.469-1.728 1.28-1.728 2.432 0 .981.299 1.792.896 2.432.64.64 1.451.96 2.432.96zm43.313-25.152c2.73 0 5.141.661 7.232 1.984 2.09 1.323 3.712 3.221 4.864 5.696 1.194 2.432 1.792 5.269 1.792 8.512 0 3.243-.598 6.123-1.792 8.64-1.152 2.517-2.795 4.48-4.928 5.888-2.091 1.365-4.48 2.048-7.168 2.048-2.091 0-4.011-.427-5.76-1.28-1.707-.853-3.008-2.027-3.904-3.52-.128 1.451-.704 2.603-1.728 3.456-.982.811-2.283 1.216-3.904 1.216-1.707 0-3.072-.469-4.096-1.408-.982-.981-1.472-2.261-1.472-3.84V317.68c0-1.493.533-2.709 1.6-3.648 1.066-.981 2.474-1.472 4.224-1.472 1.664 0 3.008.448 4.032 1.344 1.024.896 1.536 2.091 1.536 3.584v12.736c.938-1.365 2.24-2.453 3.904-3.264 1.706-.811 3.562-1.216 5.568-1.216zM242.985 350c1.962 0 3.477-.683 4.544-2.048 1.066-1.408 1.6-3.413 1.6-6.016 0-2.475-.534-4.373-1.6-5.696-1.024-1.323-2.518-1.984-4.48-1.984-2.006 0-3.542.683-4.608 2.048-1.067 1.323-1.6 3.243-1.6 5.76 0 2.56.533 4.523 1.6 5.888 1.066 1.365 2.581 2.048 4.544 2.048zm28.352 8.384c-1.622 0-2.987-.427-4.096-1.28-1.067-.896-1.6-2.219-1.6-3.968v-35.264c0-1.749.533-3.072 1.6-3.968 1.109-.896 2.474-1.344 4.096-1.344 1.621 0 2.965.448 4.032 1.344 1.109.896 1.664 2.219 1.664 3.968v35.264c0 1.749-.555 3.072-1.664 3.968-1.067.853-2.411 1.28-4.032 1.28zm37.904-10.496c.981 0 1.77.384 2.368 1.152.64.768.96 1.771.96 3.008 0 1.707-.832 3.008-2.496 3.904-1.451.725-3.179 1.344-5.184 1.856-1.963.469-3.776.704-5.44.704-3.499 0-6.55-.661-9.152-1.984-2.603-1.323-4.608-3.221-6.016-5.696-1.408-2.475-2.112-5.376-2.112-8.704 0-3.157.661-5.973 1.984-8.448 1.365-2.517 3.242-4.459 5.632-5.824 2.432-1.408 5.162-2.112 8.192-2.112 2.944 0 5.525.64 7.744 1.92 2.218 1.28 3.925 3.093 5.12 5.44 1.237 2.347 1.856 5.099 1.856 8.256 0 .981-.235 1.749-.704 2.304-.427.512-1.067.768-1.92.768h-16.896c.298 2.048.96 3.52 1.984 4.416 1.024.896 2.538 1.344 4.544 1.344 1.066 0 2.048-.107 2.944-.32a36.106 36.106 0 003.008-1.024c.64-.256 1.258-.469 1.856-.64.64-.213 1.216-.32 1.728-.32zm-10.944-14.464c-1.494 0-2.688.491-3.584 1.472-.896.939-1.43 2.325-1.6 4.16h10.048c-.256-3.755-1.878-5.632-4.864-5.632z"
      ></path>
    </svg>
  );
}

export default MissingCover;
