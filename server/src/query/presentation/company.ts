import { inject } from '../../command/infra/di/registry';
import { Route } from '../../command/infra/http/server/decorators/route-decorator';
import { ControllerValidationError } from '../../command/infra/http/server/protocols/controller';
import { HttpMethods } from '../../command/infra/http/server/protocols/http/methods';
import CompanyQueryService from '../services/company-query-service';

export default class CompanyQueryPresentationFactory {
    @inject('company-query-service')
    private readonly companyQueryService!: CompanyQueryService;

    @Route(HttpMethods.GET, '/company')
    getAllCompanyNamesAndId() {
        return new ControllerValidationError({
            handler: async () => await this.companyQueryService.getAllCompanyNamesAndId()
        });
    }
}
