import StremioService from "../src/utils/StremioService";

describe("StremioService getMeta", () => {
    let fetchMock: jest.Mock;
    let service: StremioService;

    beforeEach(() => {
        fetchMock = jest.fn();
        global.fetch = fetchMock;
        service = new StremioService();

        // Mock console.error to avoid polluting the test output
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch meta details successfully", async () => {
        const mockData = { title: "Test Meta", id: "tt1234567" };

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const type = "movie";
        const id = "tt1234567";

        const result = await service.getMeta(type, id);

        expect(result).toEqual(mockData);
        expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/meta/${type}/${id}.json`);
    });

    it("should throw an error when fetch response is not ok", async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        const type = "movie";
        const id = "tt1234567";

        await expect(service.getMeta(type, id)).rejects.toThrow("HTTP error! status: 404");

        expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/meta/${type}/${id}.json`);
        expect(console.error).toHaveBeenCalledWith('Error fetching meta:', expect.any(Error));
    });

    it("should throw an error on network failure", async () => {
        const mockError = new Error("Network error");
        fetchMock.mockRejectedValueOnce(mockError);

        const type = "movie";
        const id = "tt1234567";

        await expect(service.getMeta(type, id)).rejects.toThrow("Network error");

        expect(fetchMock).toHaveBeenCalledWith(`${service.baseUrl}/meta/${type}/${id}.json`);
        expect(console.error).toHaveBeenCalledWith('Error fetching meta:', mockError);
    });
});
