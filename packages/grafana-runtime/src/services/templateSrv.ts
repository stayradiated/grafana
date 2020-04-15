import { VariableModel } from '@grafana/data';

/**
 * Via the TemplateSrv consumers get access to all the available template variables
 * that can be used within the current active dashboard.
 *
 * For a mor in-depth description visit: https://grafana.com/docs/grafana/latest/reference/templating
 * @public
 */
export interface TemplateSrv {
  getVariables(): VariableModel[];
}

let singletonInstance: TemplateSrv;

/**
 * Used during startup by Grafana to set the TemplateSrv so it is available
 * via the the {@link getTemplateSrv} to the rest of the application.
 *
 * @internal
 */
export const setTemplateSrv = (instance: TemplateSrv) => {
  singletonInstance = instance;
};

/**
 * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
 * template variables.
 *
 * @public
 */
export const getTemplateSrv = (): TemplateSrv => singletonInstance;
