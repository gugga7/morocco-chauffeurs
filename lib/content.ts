import type { City, Service, Vehicle, Route, Testimonial } from "./types";
import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

function loadJson<T>(dir: string, slug: string): T {
  const filePath = path.join(contentDir, dir, `${slug}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function loadAll<T>(dir: string): T[] {
  const dirPath = path.join(contentDir, dir);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  return files.map((f) => loadJson<T>(dir, f.replace(".json", "")));
}

export function getCity(slug: string): City {
  return loadJson<City>("cities", slug);
}

export function getAllCities(): City[] {
  return loadAll<City>("cities");
}

export function getService(slug: string): Service {
  return loadJson<Service>("services", slug);
}

export function getAllServices(): Service[] {
  return loadAll<Service>("services");
}

export function getVehicle(slug: string): Vehicle {
  return loadJson<Vehicle>("fleet", slug);
}

export function getAllVehicles(): Vehicle[] {
  return loadAll<Vehicle>("fleet");
}

export function getRoute(slug: string): Route {
  return loadJson<Route>("routes", slug);
}

export function getAllRoutes(): Route[] {
  return loadAll<Route>("routes");
}

export function getTestimonials(): Testimonial[] {
  const filePath = path.join(contentDir, "testimonials.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Testimonial[];
}
