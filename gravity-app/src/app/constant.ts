@Directive()
export class Constant {
    public static UNIT_SIZE = 3; // px
    public static UNIT_FRAME_RUN = 1; // ms
    public static UNIT_FRAME_RENDER = 10; // ms
    public static UNIT_TIME = Math.pow(10, 4); // second
    public static UNIT_DISTANCE = 0.1 * Math.pow(10, -9);
    public static UNIT_FORCE = 4 * Math.pow(10, -22);
    public static MAP_WIDTH_UNIT = 400;
    public static MAP_HEIGHT_UNIT = 400;
    public static ENTITY_RADIUS_UNIT = 1;
    public static GRAVITY_CONST = 6.67408 * Math.pow(10, -11);

    // Mass, in kg
    public static MASS_SUN = 1.989 * Math.pow(10, 30);
    public static MASS_EARTH = 5.972 * Math.pow(10, 24);
    public static MASS_JUPITER = 1.898 * Math.pow(10, 27);
    public static MASS_SATURN = 5.6846 * Math.pow(10, 26);
    public static MASS_MARS = 6.4185 * Math.pow(10, 23);
    public static MASS_ASTEROID = 2 * Math.pow(10, 14);

    // Velocity, in m/s
    public static VELOCITY_EARTH = 29.79 * 1000;
    public static VELOCITY_JUPITER = 13.07 * 1000;
    public static VELOCITY_SATURN = 9.69 * 1000;
    public static VELOCITY_MARS = 24.13 * 1000;
    public static VELOCITY_ASTEROID = 4.82 * 1000;

    // Distance, in m
    public static DISTANCE_EARTH = 149.6 * Math.pow(10, 9);
    public static DISTANCE_JUPITER = 778.547 * Math.pow(10, 9);
    public static DISTANCE_SATURN = 1.433 * Math.pow(10, 12);
    public static DISTANCE_MARS = 2.2793664 * Math.pow(10, 11);
    public static DISTANCE_ASTEROID = 1.533 * Math.pow(10, 12);
}